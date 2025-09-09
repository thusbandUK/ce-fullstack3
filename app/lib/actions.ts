'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { UserEmailSchema } from './data';
import { UserDetails } from './definitions';

const FormSchema = z.object({
  username: z.coerce.string({invalid_type_error: "Name must be a string",}).max(20).min(5),  
  mailTick: z.coerce.boolean(),
});
 
const NewUser = FormSchema;

const UpdateUsernameSchema = z.object({
  username: z.coerce.string({invalid_type_error: "Name must be a string",}).max(20).min(5),  
  email: z.coerce.string({invalid_type_error: "Invalid email"}).email()
});

const UpdatedUser = UpdateUsernameSchema;

export type State = {
  
  message?: string | null;
  errors?: {
    username?: string[];
    email?: string[];    
  };
};

export async function signUpUser(email: string, location: string | null, prevState: State, formData: FormData) {
console.log('signUpUser called');
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
  console.log('validated fields not successful');
  console.log(validatedFields.error.flatten());
  return {
    message: 'Username rejected. Try again.',      
    errors: {        
      username: validatedFields.error.flatten().fieldErrors.username,
      email: []
    },
    
  };
}

const validatedMailTick = validatedFields.data?.mailTick;

console.log(validatedMailTick);

const validatedUsername = validatedFields.data?.username;

const validatedEmail = emailValidation.data?.validatedEmail;

//const query = 'INSERT INTO users (name, email, receive_email) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING;'
const query = 'UPDATE users SET name = $1 WHERE email = $2'
//const argumentData = [validatedUsername, validatedEmail, validatedMailTick];
const argumentData = [validatedUsername, validatedEmail];

try {
  console.log('got to try')
  const userDetails = await sql.query<UserDetails>(query, argumentData);
      
} catch (error){
  console.log('error route triggered')
  return {
    message: 'Database Error: Failed to sign up new user.'
  };
}

console.log('got past try catch section')
revalidatePath('/welcome');
console.log('got past revalidate path')
redirect(`/welcome?location=${location}`);
console.log('got past redirect');
}

export async function updateUser(email: string, prevState: State, formData: FormData) {  
  
  //validates username to ensure string between 5 and 20 characters long,
  //validates email (even though passed directly from session object)
  const validatedFields = UpdatedUser.safeParse({    
    username: formData.get('username'),
    email: email
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
  const validatedEmail = validatedFields.data?.email;
    
  const query = 'UPDATE users SET name = $1 WHERE email = $2'
  const argumentData = [validatedUsername, validatedEmail];
  
  try {    
    const userDetails = await sql.query<UserDetails>(query, argumentData);
        
  } catch (error){    
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
    console.log('validated fields not successful');
    console.log(validatedFields.error.flatten());
    return {
      message: 'Username rejected. Try again.',      
      errors: {        
        username: validatedFields.error.flatten().fieldErrors.username,
        email: []
      },
      
    };
  }
  
  const validatedMailTick = validatedFields.data?.mailTick;

  console.log(validatedMailTick);

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
    }/**/
  }
  
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