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
  //email: z.string().email(),  
  mailTick: z.coerce.boolean(),
});
 
const NewUser = FormSchema;


export type State = {
  
  message?: string | null;
  errors?: {
    username?: string[];
    email?: string[];    
  };
};

export async function signUpUser(email: string, location: string | null, prevState: State, formData: FormData) {  
  
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
    