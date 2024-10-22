'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { State, signUpUser } from '@/app/lib/actions';
import { useActionState } from 'react';
import { useFormState } from 'react-dom';

export default function SignUpForm({
  username,
  email,
  location,
}: {
  username: string;
  email: string;
  location: string | null;
}) {
  //const initialState: State = { message: null, errors: {} };
  const initialState: State = { message: null, errors: {username: [], email: []}};
  const signUpUserWithEmail = signUpUser.bind(null, email, location);
  const [state, formAction] = useFormState(signUpUserWithEmail, initialState);
  //const [state, formAction] = useFormState(email, signUpUser, initialState)

  //const initialState: State = { message: null, errors: {} };
  //const [state, formAction] = useActionState(createInvoice, initialState);
  

  return (
    <form action={formAction}>
      
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username">
            Choose username
          </label>
          <div className="relative">
            <input
              id="username"
              name="username"              
              defaultValue={username}              
            >              
            </input>            
          </div>
          <div id="username-error" aria-live="polite" aria-atomic="true">
              {state.errors?.username &&
              state.errors.username.map((error: any) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label>
            Email
          </label>
          <div className="relative">
            <p>{email}</p>           
          </div>
          <label
            htmlFor="mailTick"
          >Tick if you are happy for Chemistry Elephant to send you emails about special offers and new additions to the website</label>
          <input
            id="mailTick"
            name="mailTick"
            type="checkbox"
          ></input>
        </div>
        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        
        <Button type="submit">Sign up</Button>
      </div>
      
    </form>
  );
}
