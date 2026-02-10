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
//import { sql } from '@vercel/postgres';
import { pool } from './poolInstantiation';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
//const crypto = require('crypto');
const { subtle } = globalThis.crypto;
import { sendMail } from './send-mail';
import { dateCompare } from './dateCompare';
const SITE_URL = process.env.SITE_URL;
import { customDeleteMailHtml, customDeleteMailText } from '../emails/deleteAccountEmail';
import { headers } from 'next/headers';
import { auth } from '../../auth';
import { decryptUserData } from './encryption';

const InitiateDeleteSchema = z.object({
  email: z.coerce.string({invalid_type_error: "Invalid email"}).email()
})

const ConfirmDeleteSchema = z.object({
  email: z.coerce.string({invalid_type_error: "Corrupted email"}).email(),  
  token: z.coerce.string({invalid_type_error: "Corrupted token"}).regex(/^[a-zA-Z0-9]+$/, { message: "link can only contain letters and numbers" }).min(64).max(64),
});

const ConfirmCoercionSchema = z.object({
  email: z.coerce.string(),
  token: z.coerce.string()
})
 
const NewConfirmEmail = InitiateDeleteSchema;
const NewConfirmUser = ConfirmDeleteSchema;
const ConfirmCoercion = ConfirmCoercionSchema;

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

//self explanatory name. It's specifically for use in the unlikely but not impossible scenario that
//someone generates a delete account link but manages to open it on a browser where a different user
//is logged in. It redirects to account/delete/signout, which will explain what has happened

export async function autoSignOut(){

  const { success } = await auth.api.signOut({
    headers: await headers(),
  })
  redirect('/account/delete/signed-out')

}

import { logSuspiciousActivity } from './logging';

export async function confirmDelete(prevState: State3, formData: FormData){
  //retrieves session data for user
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })
  
  //redirects user to login if no session data
  if (!session){    
    redirect('/account/login')
  }

  //extracts email and token from formData
  const emailArgument = formData.get('email')
  const tokenArgument = formData.get('token')

  //validates email and token to ensure not corrupted
  const validatedFields = NewConfirmUser.safeParse({    
    email: emailArgument,
    token: tokenArgument,
  });  
  
  
  //if validation fails, the function returns and the front end
  //renders a link to which is passed the params 'corrupted', which
  //conditionally renders an explanatory note about what's gone wrong
  //ALSO suspicious activity is logged
  if (!validatedFields.success) {
    //coerces token and email arguments into strings
    const coercedData = ConfirmCoercion.safeParse({
      email: emailArgument,
      token: tokenArgument
    })
    
    //extracts coerced email and token
    const coercedEmail = coercedData.data?.email;
    const  coercedToken = coercedData.data?.token
    
    //prepares and then logs data
    const combinedString: string = `Email: ${coercedEmail}, Token: ${coercedToken}`
    await logSuspiciousActivity(combinedString, "confirmDelete")

    //returns error message
    return {
      message: 'Corrupted link. Please request a new one.',
      linkParams: 'corrupted',
      errors: {
        email: [],
        token: []
      },      
    };
  }

  //extracts validated email and token arguments
  const validatedEmail = validatedFields.data?.email;
  const validatedToken = validatedFields.data?.token;
    
  //confirm email passed in token matches that for user signed in
  const { email, id } = session.user;

  const decryptedEmail = await decryptUserData(email, id);

  /*This should be an auto signout situation, see previous logic */
  if (decryptedEmail !== validatedEmail){
    return {
      message: 'Records do not match supplied credentials. You may need to send a new link.',
      linkParams: 'wrong'
    }
  }

  //query and argument to confirm that the email and token are present and paired in the
  //database
  const confirmCredentialsQuery = 'SELECT * FROM delete_token WHERE identifier = $1 AND token = $2'
  const confirmationArguments = [email, validatedToken]

  //query for the deletion of user data from "user" table (see note on delete cascade below)

  const deleteFromUserQuery = 'DELETE FROM "user" WHERE id = $1 RETURNING *'
  
  const client = await pool.connect();

  try {

    await client.query("BEGIN")

    //call to check supplied credentials are present and paired
    const confirmationAttempt = await client.query(confirmCredentialsQuery, confirmationArguments);
    
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

    //If the credentials match, this extracts the 
    //recorded timestamp
    const { expires } = confirmationAttempt.rows[0];

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

    //this deletes the user's entry in the users table, which then automatically
    //cascades to delete rows of all tables which reference user.id as a foreign key,
    //ie: account, session, delete_token, encryption_data (but NOT verification, a column
    //required for better-auth, but which was not currently in use at time of writing)
    await client.query(deleteFromUserQuery, [id])

    await client.query("COMMIT")    

  } catch (error){
    console.log(error)
    
    await client.query("ROLLBACK");

    return {
      message: 'Database Error: Failed to delete records.'
    };

  } finally {

    client.release();

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
    
    const client = await pool.connect();

    const existingEntry = await client.query(query, argument);

    client.release();
    
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

export async function initiateDelete(email: string, prevState: State2){
  //retrieves session data for user
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })
  
  //redirects user to login if no session data (BEST URL FOR THIS?)
  if (!session){    
    redirect(`/account/login`);
  }
  
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

  const {email: encryptedEmail, id} = session.user;

    //collectively, the two terms below generate a random 64-character alphanumerical string
    const {
      randomBytes,
    } = await import('node:crypto');
    
    const buf = randomBytes(32);
    //const token = crypto.randomBytes(32);
    const stringToken = buf.toString('hex');
        
    const timestamp = new Date()
        
    const query = //'INSERT INTO delete_token VALUES ($1, $2, $3) ON CONFLICT (identifier) DO NOTHING;'
    /*`INSERT INTO delete_token (identifier, expires, token) 
       VALUES ($1, $2, $3)
       ON CONFLICT (identifier, token) DO UPDATE 
         SET expires = excluded.expires, 
         token = excluded.token;`*/
      `INSERT INTO delete_token ("userId", identifier, expires, token) 
       VALUES ($1, $2, $3, $4)
       ON CONFLICT ("userId") DO UPDATE 
         SET expires = excluded.expires, 
         identifier = excluded.identifier,
         token = excluded.token;`
    const argumentData = [id, encryptedEmail, timestamp, stringToken];

    try {

      const client = await pool.connect();

      const returnedData = await client.query(query, argumentData);

      client.release();
      
      const deleteUrl = `${SITE_URL}/account/delete/confirm?token=${stringToken}&email=${validatedEmail}`
      
      await sendMail(
        {
          email: validatedEmail,
          sendTo: validatedEmail,
          subject: 'Link to delete account',
          text: customDeleteMailText({deleteUrl: deleteUrl, host: String(SITE_URL)}),
          html: customDeleteMailHtml({ deleteUrl: deleteUrl, host: String(SITE_URL) })
        }
      )      
          
    } catch (error){
      console.log(error);
      return {        
        message: 'Database Error: Failed to initiate account deletion.'
      };      
  }
  
  revalidatePath('/account/delete');
  redirect(`/account/delete/sent`);
}

//Separate function which updates the timestamp and the token for an existing entry
//in the delete_token table

export async function renewDelete(email: string, prevState: State2){
  //retrieves session data for user
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })
  
  //redirects user to login if no session data (BEST URL FOR THIS?)
  if (!session){    
    redirect(`/account/login`);
  }
  
  const { email: encryptedEmail, id } = session.user;


  //validates email to ensure not corrupted, it expects one thing and one thing only
  //and that's a valid email
  const validatedFields = NewConfirmEmail.safeParse({
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
  const {
    randomBytes,
  } = await import('node:crypto');
  
  const buf = randomBytes(32);
  //const token = crypto.randomBytes(32);
  const stringToken = buf.toString('hex');
  //const token = crypto.randomBytes(32);
  //const stringToken = token.toString('hex');    
      
  const timestamp = new Date()
  
  //the identifier is the encrypted email address (since all data should be encrypted, but then,
    //could you not just use a foreign key?) but of course the delete email has to be sent 
    //to the validated decrypted email address (from the email passed to the function)
  const query = 'UPDATE delete_token SET "userId" = $1, token = $2, expires = $3 WHERE identifier = $4'
  
  const argumentData = [id, stringToken, timestamp, encryptedEmail];  

  try {

    const client = await pool.connect();
    
    const returnedData = await client.query(query, argumentData);

    client.release();
    
    const deleteUrl = `${SITE_URL}/account/delete/confirm?token=${stringToken}&email=${validatedEmail}`
    
    await sendMail(
      {
        email: validatedEmail,
        sendTo: validatedEmail,
        subject: 'Link to delete account',
        text: customDeleteMailText({deleteUrl: deleteUrl, host: String(SITE_URL)}),
        html: customDeleteMailHtml({ deleteUrl: deleteUrl, host: String(SITE_URL) })
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