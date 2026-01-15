'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
//import { signIn } from '../../auth';
import { UserEmailSchema } from './schema';
import { UserDetails } from './definitions';
import { locationParser } from './functions';
//import { isRedirectError } from "next/dist/client/components/redirect";
//import { verifySolution } from 'altcha-lib';
//import { authClient } from '../../auth-client';


const FormSchema = z.object({
  username: z.coerce.string({invalid_type_error: "Username can only contain letters and numbers",}).regex(/^[a-zA-Z0-9]+$/, { message: "Username can only contain letters and numbers" }).max(20).min(5),
  mailTick: z.coerce.boolean(),
});
 
const NewUser = FormSchema;

const UpdateUsernameSchema = z.object({
  username: z.coerce.string({invalid_type_error: "Username can only contain letters and numbers",}).regex(/^[a-zA-Z0-9]+$/, { message: "Username can only contain letters and numbers" }).max(20).min(5),  
});

const UpdatedUser = UpdateUsernameSchema;

const SignUpNewsLetterSchema = z.object({
  mailTick: z.coerce.boolean(),
})

const UpdatedMailTick = SignUpNewsLetterSchema;

const ExecuteSignInSchema = z.object({
  email: z.coerce.string({invalid_type_error: "Invalid email"}).email(),
  hmac: z.coerce.string()
})

const UpdatedSignInDetails = ExecuteSignInSchema;

export type State = {
  
  message?: string | null;
  errors?: {
    username?: string[];
    email?: string[];    
  };
};

export type StateSignUpNewsletter = {
  
  message?: string | null;
  errors?: {    
    email?: string[];
    mailTick?: string[];
  };
};



export type StateExecuteSignIn = {
  message?: string | null;
  errors?: {    
    email?: string[];
    captcha?: string[];
  };
}

import { auth } from '../../auth';


export async function betterAuthSignIn(location: string){  

  let url = "";

  //const baseUrl = process.env.BETTER_AUTH_URL
  const baseUrl = process.env["BETTER_AUTH_URL"]

  //from auth redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
  console.log('redirectURI called...')
  console.log(`${process.env.BETTER_AUTH_URL}/api/auth/callback/google`)

  try {

   

  const signInResult = await auth.api.signInSocial({
    body: {
      provider: "google", // or any other provider id,
      disableRedirect: false,
      callbackURL: location ? `${baseUrl}/${location}` : undefined,
      newUserCallbackURL: "/account/welcome/signup",
          
    },
  });
  //console.log('betterAuthSignIn got past social sign in call')
  //console.log(signInResult)
  url = String(signInResult.url)


  } catch (error){
    console.log(error)

  }
  redirect(url);
}

import { headers } from "next/headers";

export const betterAuthSignOut = async () => {

  try {

    //const data = await authClient.signOut();
    //console.log('data when sign out called')
    //console.log(data)
    const { success } = await auth.api.signOut({
      headers: await headers(),
    })

    console.log(success)
    

  } catch (error){
    console.log(error)

  }

}


export const betterAuthDeleteUser = async() => {

  try {

    //const data = await authClient.deleteUser(//{
      //headers: await headers(),
    //}
  //)

  
  const { success } = await auth.api.deleteUser({
    body: {
      callbackURL: '/account'
    },
    headers: await headers()
  })
  /*const { success } = await auth.api.deleteUser()*/
  console.log(success)

  } catch (error){
    console.log(error)
  }
}

/*
executeSignInFunction is the one that actually logs in the user. They submit their email address, and
via the next-auth signIn function an email is sent to them with a link they can click to complete the 
sign in process.
The function below calls signIn once their email address has been validated. 
The function also extracts the altcha data and calls verifySolution to confirm that the data matches
what is expected
see exemplar: https://github.com/altcha-org/altcha-starter-nodejs-ts/blob/main/src/index.ts 
*/

/*
export async function executeSignInFunction(location: string | null, provider: any, prevState: StateExecuteSignIn, formData: FormData) {

  const hmacKey = process.env.ALTCHA_HMAC_SECRET

  // Get the 'altcha' field containing the verification payload from the form data
  const altcha = formData.get('altcha')

  // If the 'altcha' field is missing, return an error
  if (!altcha) {
    return {
      ...prevState,
      message: "Captcha failed. Did you tick the box?"
    }
  }

  //validates incoming email address, coerces hmacKey into string
  const dataValidation = ExecuteSignInSchema.safeParse({
    email: formData.get("email"),
    hmac: hmacKey
  });

  //If form validation fails, return errors early. Otherwise, continue.
  if (!dataValidation.success) {
    return {
      message: 'Details rejected. Try again!',
        errors: {
          email: dataValidation.error.flatten().fieldErrors.email,
          captcha: []
      },
    };
  }

  //extracts string coerced hmacKey and validated email
  const {hmac: validatedHmacKey, email: validatedEmail} = dataValidation.data;

  //Verify the solution using the secret HMAC key
  const verified = await verifySolution(String(altcha), validatedHmacKey)

  //if the captcha doesn't verify, this returns an error message saying so
  if (!verified){
    return {
      message: 'Details rejected. Try again!',
        errors: {
          email: [],
          captcha: ['Unfortunately your captcha attempt failed. Are you a robot?']
      },
    }
  }

  //makes a copy of incoming formData
  const updatedFormData = formData;
  //modifies formData copy with validatedEmail
  updatedFormData.set("email", validatedEmail)

  try {
    //calls the next-auth function to sign in user via email sent
    await signIn(provider?.id, updatedFormData, {
      redirectTo: location ?? "",
    })
  } catch (error) {
    //see: https://github.com/nextauthjs/next-auth/discussions/9389
    //it seems that it has to throw an error for this one, redirects to account/auth/error
    //calling redirect inside the try catch block does not work, but calling it from finally block
    //means that it gets called even when an error is returned.

    if (isRedirectError(error)) {
      throw error;
    }

    return { ...prevState,
      message: "Something went wrong. Give it a refresh and have another go."
    }

  }
  //this has to be outside try catch block or it does not work, anyway, only if signIn is
  //successful is the user redirected as below

  redirect('/account/auth/verify-request');

}
*/

/*
CHANGES REQUIRED TO SIGNUPUSER BELOW
the user will have sent their desired username via a form, which will call the corresponding function
in that file, let's say: updateUsername

RECEIVES: encrypted email address from user, the new username, any location

1) validates the incoming username, string: no symbols, particular length, all lowercase, etc.
2) retrieves the wrapped key and iv from the database - so the session object has the encryptionDataId
3) unwraps the key using unwrapkey
4) encodes the username using the above, via aesEncryptString
5) writes the encoded username to the database

need to figure out: what data is included in the session / user data (id?), so that we know how to 
search for their data

*/

//import { getSession } from 'better-auth/api';
//import { authClient } from "@/lib/client"
import { unwrapKey, aesEncryptString, encryptUsername, importPrivateRsaKeyMdn, privateKeyAsCryptoKey, unwrapStringifiedKey } from './encryption';
//import { headers } from "next/headers";


export async function signUpUser(email: string, location: string | null, prevState: State, formData: FormData) {

  //takes whatever has been passed as location and returns string
  const parsedLocation = locationParser(location)

  //collects private key from env var
  //const privateKey = await privateKeyAsCryptoKey();
  
  //retrieves session data for user
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })
  
  //redirects user to login if no session data
  if (!session){    
    redirect(parsedLocation.length !== 0 ? parsedLocation : '/account');
  }
  
  //collects id for user table and corresponding row of encryptionData table
  const { id } = session.user;

  //validates username to ensure string between 5 and 20 characters long and mailTick to ensure boolean
  const validatedFields = NewUser.safeParse({    
    username: formData.get('username'),
    mailTick: formData.get('mailTick'),  
  });

  // If form validation fails, return errors early. Otherwise, continue.

  if (!validatedFields.success) {  
    return {
      message: 'Username rejected. Try again.',      
      errors: {        
        username: validatedFields.error.flatten().fieldErrors.username,
        email: []
      },    
    };
  }

  //harvests validated values
  const validatedMailTick = validatedFields.data?.mailTick;
  const validatedUsername = validatedFields.data?.username;

  //encryptionData query
  //const queryForWrappedKeyIv = 'SELECT iv, wrapped_key FROM encryption_data WHERE id = $1'
  //const argumentForWrappedKeyIv = [encryptionDataId]

  try {
  
    //const returnedKeyIv = await sql.query(queryForWrappedKeyIv, argumentForWrappedKeyIv)  
    //const { iv: returnedIv, wrapped_key: returnedWrappedKey} = returnedKeyIv.rows[0]  

    //bufferises returned IV
    //const bufferisedReturnedIv = Buffer.from(returnedIv, 'hex')
  
    //if (!privateKey){
      //return
    //}
    //unwraps key returned from database
    //const unwrappedKey = await unwrapStringifiedKey(returnedWrappedKey, privateKey)
  
    //encrypts username
    //const encryptedUsername = await aesEncryptString(validatedUsername, unwrappedKey, bufferisedReturnedIv)
  
    const encryptedUsername = await encryptUsername(validatedUsername, id)

    //query and values to pass
    const query = 'UPDATE "user" SET username = $1, receive_email = $2 WHERE id = $3'
    const argumentData = [encryptedUsername, validatedMailTick, id];//, validatedEmail
  
    //writes encrypted username to database, records true or false for receive_email
    await sql.query<UserDetails>(query, argumentData);
  
} catch (error){
  console.error(error);
  return {
    message: 'Database Error: Failed to create username. Please try again.'
  };
}

revalidatePath('/account/welcome');
redirect(parsedLocation.length !== 0 ? parsedLocation : '/account');

}

import { decryptUserData } from './encryption';

export async function getDecryptedUsername(){

  //retrieves session data for user
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })
  
  //redirects user to login if no session data
  if (!session){    
    return;
  }
  
  //collects id for user table and corresponding row of encryptionData table
  const { id } = session.user;

  const fetchUsernameQuery = 'SELECT username FROM "user" WHERE id = $1';
  const fetchUsernameArgument = [id]

  const fetchedData = await sql.query(fetchUsernameQuery, fetchUsernameArgument)
  
  const {username} = fetchedData.rows[0]

  if (!username){
    return
  }

  const decryptedUsername = await decryptUserData(username, id);

  return decryptedUsername;  

}

//signupnewsletter STARTS

export async function signUpNewsletter(email: string, location: string | null, prevState: State, formData: FormData) {
  
  //validates email
  const emailValidation = UserEmailSchema.safeParse({
    validatedEmail: email,
  });
  
  //validates username to ensure string between 5 and 20 characters long and location
  //to ensure string not null
  const validatedFields = UpdatedMailTick.safeParse({
    mailTick: formData.get('mailTick'),    
  }) 
    
  // If form validation fails, return errors early. Otherwise, continue.
  
  if (!validatedFields.success) {    
    return {
      message: 'Tick or no tick, no other options. Try again.',      
      errors: {        
        mailTick: validatedFields.error.flatten().fieldErrors.mailTick,
        email: []
      },      
    };
  }
  
  //harvests validation logic for validated values

  const validatedMailTick = validatedFields.data?.mailTick;  
  const validatedEmail = emailValidation.data?.validatedEmail;  
  
  const query = 'UPDATE users SET receive_email = $1 WHERE email = $2'  
  const argumentData = [validatedMailTick, validatedEmail];
  
  try {
    
    const userDetails = await sql.query<UserDetails>(query, argumentData);
        
  } catch (error){    
    return {
      message: 'Database Error: Failed to change newsletter setting.'
    };
  }
  
  const parsedLocation = locationParser(location)

  revalidatePath('/receiveEmails');  
  redirect(parsedLocation.length !== 0 ? parsedLocation : '/account');
  
}

//signUpNewsletter ENDS

/*
This will take the user.encryptionDataId and user.id
and write user.id as user_id in the encryptionData table where id = encryptionDataId
*/

export async function encryptionDataUserId (userId: string, encryptionDataId: string){

  //retrieves session data for user
  /*const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })

  //redirects user to login if no session data
  if (!session){    
    redirect('/account/login');
  }

  const { encryptionDataId } = session.user;*/
  const query = 'UPDATE encryption_data SET "userId" = $1 WHERE id = $2'
  const argument = [userId, encryptionDataId];

  try {

    await sql.query(query, argument)
    return

  } catch (error){
    console.log(error)
    throw new Error()
  }

}


export async function updateUser(prevState: State, formData: FormData) {

  //retrieves session data for user
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })

  //redirects user to login if no session data
  if (!session){    
    redirect('/account/login');
  }

  //collects id for user table and corresponding row of encryptionData table
  const { id } = session.user;

  //validates username to ensure string between 5 and 20 characters long,
  const validatedFields = UpdatedUser.safeParse({    
    username: formData.get('username'),
  });

  // If form validation fails, return errors early. Otherwise, continue.  
  if (!validatedFields.success) {
    return {
      message: 'Username rejected. Must be between 5 and 20 letters long.',      
      errors: {        
        username: validatedFields.error.flatten().fieldErrors.username,
        email: []
      },      
    };
  }

  const validatedUsername = validatedFields.data?.username;
  
  try {

    const encryptedUsername = await encryptUsername(validatedUsername, id)

    const query = 'UPDATE "user" SET username = $1 WHERE id = $2'
    const argumentData = [encryptedUsername, id];

    await sql.query<UserDetails>(query, argumentData);
        
  } catch (error){
    console.log(error)
    return {
      message: 'Database Error: Failed to sign up new user.'
    };
  }

  revalidatePath('/account/username');
  redirect(`/account`);
  
}

export async function signUpUser2(email: string, location: string | null, prevState: State, formData: FormData) {  
  
  //validates email
  const emailValidation = UserEmailSchema.safeParse({
    validatedEmail: email,
  });

  //validates username to ensure string between 5 and 20 characters long
  const validatedFields = NewUser.safeParse({    
    username: formData.get('username'),
    mailTick: formData.get('mailTick'),
  });
    
  // If form validation fails, return errors early. Otherwise, continue.
  
  if (!validatedFields.success) {
    //console.log('validated fields not successful');
    //console.log(validatedFields.error.flatten());
    return {
      message: 'Username rejected. Try again.',      
      errors: {        
        username: validatedFields.error.flatten().fieldErrors.username,
        email: []
      },
      
    };
  }
  
  const validatedMailTick = validatedFields.data?.mailTick;

  //console.log(validatedMailTick);

  const validatedUsername = validatedFields.data?.username;
  
  const validatedEmail = emailValidation.data?.validatedEmail;

  const query = 'INSERT INTO users (name, email, receive_email) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING;'

  const argumentData = [validatedUsername, validatedEmail, validatedMailTick];
  
  try {
    const userDetails = await sql.query<UserDetails>(query, argumentData);
        
  } catch (error){
    return {
      message: 'Database Error: Failed to sign up new user.'
    };
  }
  
  revalidatePath('/welcome');
  redirect(`/welcome?location=${location}`);  

}

/*
This threw an error - the did you mean to call nextjs/server error - during a test written to test 
updateUsername (exported from this same module). Searches suggest it is not called anywhere by
any other module and hence can safely be deleted. Tests pending. So user can still log in and out,
I believe this can be deleted

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {

    console.log('authenticate function called w...')
    console.log(formData);
    
    
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }/**//*
  }

  */
  
  export async function incrementExamboard(examboard: string){

    const query = 'UPDATE examboards SET logged_interest = logged_interest + 1 WHERE examboard = $1;'
    const argumentData = [examboard];

    try {
      const incrementedExamboard = await sql.query(query, argumentData);
      console.log(`Success, examboard ${examboard} incremented by 1`);
      return 
          
    } catch (error){
      return {
        message: 'Database Error: Failed to sign up new user.'
      };
  }
}