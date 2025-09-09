/*
Two phases:

1) Send token via email, user clicks link in email, which has a token and query, create a new route for 
account deletion

2) Having clicked link and returned to website, the dialogue box says: are you sure you want to delete
all data associated with your account? Yes / No On click yes there's a function which deletes everything
so you need to have the email, check what happens with the login auth

see exemplar link in toDoHidden.txt

*/
"use server"

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const crypto = require('crypto');
import { sendMail } from './send-mail';
import { dateCompare } from './dateCompare';

const InitiateDeleteSchema = z.object({
  email: z.coerce.string({invalid_type_error: "Invalid email"}).email()
})

const ConfirmDeleteSchema = z.object({
  email: z.coerce.string({invalid_type_error: "Corrupted email"}).email(),  
  token: z.coerce.string({invalid_type_error: "Corrupted token"}).min(64).max(64),
});
 
const NewConfirmEmail = InitiateDeleteSchema;
const NewConfirmUser = ConfirmDeleteSchema;

export type State2 = {
  
  message?: string | null;
  errors?: {    
    email?: string[];    
  };
};

export type State3 = {
  
  message?: string | null;
  linkParams?: string | null;
  errors?: {    
    email?: string[];
    token?: string[];
  };
};

export async function confirmDelete(prevState: State3, formData: FormData){

  //validates email and token to ensure not corrupted
  const validatedFields = NewConfirmUser.safeParse({    
    email: formData.get('email'),
    token: formData.get('token'),
  });  
  
  //if validation fails, the function returns and the front end
  //renders a link to which is passed the params 'corrupted', which
  //conditionally renders an explanatory note about what's gone wrong
  if (!validatedFields.success) {    
    return {
      message: 'Corrupted link. Please request a new one.',
      linkParams: 'corrupted',
      errors: {
        email: [],
        token: []
      },      
    };
  }

  const validatedEmail = validatedFields.data?.email;
  const validatedToken = validatedFields.data?.token;
  
  //query and argument to confirm that the email and token are present and paired in the
  //database
  const confirmCredentialsQuery = 'SELECT * FROM delete_token WHERE identifier = $1 AND token = $2'
  const confirmationArguments = [validatedEmail, validatedToken]

  //queries for the deletion of all user data throughout the different tables
  const deleteFromUsersQuery = 'DELETE FROM users WHERE email = $1 RETURNING *'
  const deleteFromSessionsQuery ='DELETE FROM sessions WHERE "userId" = $1' 
  const deleteFromVerificationTokenQuery = 'DELETE FROM verification_token WHERE identifier = $1'
  const deleteFromDeleteTokenQuery = 'DELETE FROM delete_token WHERE identifier = $1'

  try {

    await sql.query("BEGIN")

    //call to check supplied credentials are present and paired
    const confirmationAttempt = await sql.query(confirmCredentialsQuery, confirmationArguments);
    
    //if the supplied details (token and email) don't match the entry in the database,
    //the function returns and supplies params for the front end to make a bespoke
    //link to a page with an explanatory note, along with the option to send a new delete link
    //email
    if (!confirmationAttempt.rows[0]){
      return {
        message: 'Records do not match supplied credentials. You may need to send a new link.',
        linkParams: 'wrong'
      }
    }

    //If the credentials match, this extracts the identifier (email) and
    //recorded timestamp
    const { identifier, expires } = confirmationAttempt.rows[0];

    //this uses the imported function dateCompare() to check if the
    //link is older than one hour
    const dateComparison = dateCompare(expires)

    //if the link is too old, the function returns, again with specified
    //params to make a bespoke link to an explanatory page
    if (!dateComparison){      
      return {
        message: 'Link has expired. Please request a new link.',
        linkParams: 'expired'
      }
    }

    //this deletes the user's entry in the users table, but also returns the
    //corresponding id, which is then passed as userId (foreign key) to delete the user
    //data from the sessions table
    const usersReturned = await sql.query(deleteFromUsersQuery, [identifier])

    //harvests userId foreign key (see above)
    const userId = usersReturned.rows[0].id;

    //deletes remaining user data from all other tables
    await sql.query(deleteFromSessionsQuery, [userId])
    await sql.query(deleteFromVerificationTokenQuery, [identifier])
    await sql.query(deleteFromDeleteTokenQuery, [identifier])

    await sql.query("COMMIT")    

  } catch (error){
    
    await sql.query("ROLLBACK");

    return {
      message: 'Database Error: Failed to delete records.'
    };

  }

  //redirects user to goodbye page
  revalidatePath('/account/delete');
  redirect(`/account/delete/goodbye`);
  
}

/*
It's vital the user not be allowed to make two entries in the delete_token table,
which use a composite primary key consisting of the email and the token. It is not possible
to change all the tokens linked with several different instances of the same email.
Moreover, it's better to discourage the possibility of multiple entries being 
made in the delete_token table, just to save memory.
So when the user navigates to the delete account page, it automatically checks,
via the function below, to see if there is an existing entry and if there is, automatically
redirects the user to the page where a fresh link can be sent, which will *amend* the existing
details, rather than create a new entry. (see below)

*/
export async function checkExisting(email: string){  

  const query = 'SELECT * FROM delete_token WHERE identifier = $1';
  const argument = [email]

  try {
    
    const existingEntry = await sql.query(query, argument);
    
    if (!existingEntry.rows[0]){      
      return      
    } 
    
//
  } catch (error){    
    return {        
      message: 'Database Error: Failed to initiate account deletion.'
    };
  }  
  
  revalidatePath('/account/delete');
  redirect(`/account/delete/already`);

}
//, formData: FormData
export async function initiateDelete(email: string, prevState: State2){
  
  //validates email to ensure not corrupted, it expects one thing and one thing only
  //and that's a valid email
  const validatedFields = NewConfirmEmail.safeParse({    
    //email: formData.get('email')    
    email: email
  });  
  
  //The email is passed directly from session.user, so the only reason
  //the wrong thing could get passed is by bad actors  
  if (!validatedFields.success) {    
    return {
      message: 'Invalid email. Give the page a refresh and try again.',      
      errors: {
        email: [],
        token: []
      },      
    };
  }

  //extracts validated email
  const validatedEmail = validatedFields.data?.email;

    //collectively, the two terms below generate a random 64-character alphanumerical string
    const token = crypto.randomBytes(32);
    const stringToken = token.toString('hex');    
        
    const timestamp = new Date()
        
    const query = //'INSERT INTO delete_token VALUES ($1, $2, $3) ON CONFLICT (identifier) DO NOTHING;'
    `INSERT INTO delete_token (identifier, expires, token) 
       VALUES ($1, $2, $3)
       ON CONFLICT (identifier, token) DO UPDATE 
         SET expires = excluded.expires, 
         token = excluded.token;`
    const argumentData = [validatedEmail, timestamp, stringToken];

    try {

      const returnedData = await sql.query(query, argumentData);
      console.log('Below should read the returned data');
      console.log(returnedData);
      
      await sendMail(
        {
          email: validatedEmail,
          sendTo: validatedEmail,
          subject: 'Link to delete account',
          text: 'Click the link to delete your account',
          html: `<p>Click <a href="http://localhost:3000/account/delete/confirm?token=${stringToken}&email=${validatedEmail}">Link</a> to delete account</p>`
        }
      )      
          
    } catch (error){      
      return {        
        message: 'Database Error: Failed to initiate account deletion.'
      };      
  }
  
  revalidatePath('/account/delete');
  redirect(`/account/delete/sent`);
}

//Separate function which updates the timestamp and the token for an existing entry
//in the delete_token table

// formData: FormData
//, formData: FormData
export async function renewDelete(email: string, prevState: State2){
  
  //validates email to ensure not corrupted, it expects one thing and one thing only
  //and that's a valid email
  const validatedFields = NewConfirmEmail.safeParse({    
    //email: formData.get('email')
    email: email    
  });  
  
  //The email is passed directly from session.user, so the only reason
  //the wrong thing could get passed is by bad actors  
  if (!validatedFields.success) {    
    return {
      message: 'Invalid email. Give the page a refresh and try again.',      
      errors: {
        email: [],
        token: []
      },      
  };
  }

  //extracts validated email
  const validatedEmail = validatedFields.data?.email;
  //const validatedEmail = email;

  const token = crypto.randomBytes(32);
  const stringToken = token.toString('hex');    
      
  const timestamp = new Date()      
  
  const query = 'UPDATE delete_token SET token = $1, expires = $2 WHERE identifier = $3'
  
  const argumentData = [stringToken, timestamp, validatedEmail];  

  try {
    
    const returnedData = await sql.query(query, argumentData);
    
    await sendMail(
      {
        email: validatedEmail,
        sendTo: validatedEmail,
        subject: 'Link to delete account',
        text: 'Click the link to delete your account',
        html: `<p>Click <a href="http://localhost:3000/account/delete/confirm?token=${stringToken}&email=${validatedEmail}">Link</a> to delete account</p>`
      }
    )      
        
  } catch (error){    
    return {        
      message: 'Database Error: Failed to send new message with delete link.'
    };      
}

revalidatePath('/account/delete/');
redirect(`/account/delete/sent`);
}