'use client';

import { Button } from '@/app/ui/button';
import { State3, confirmDelete } from '../lib/deleteAccount';
import { useFormState } from 'react-dom';
import { useSearchParams } from 'next/navigation'
import Link from "next/link";

export default function DeleteConfirm({  
  sessionEmail
}: {  
  sessionEmail: string;  
}) {
  //const initialState: State = { message: null, errors: {} };
  const initialState: State3 = { message: null, linkParams: null, errors: {email: [], token: []}};
  const bindFormDataConfirmDelete = confirmDelete.bind(null);
  const [state, formAction] = useFormState(bindFormDataConfirmDelete, initialState);
  
    const searchParams = useSearchParams()
 
    const token = searchParams.get('token')
    const email = searchParams.get('email')

    console.log(token)
    console.log(email)
 
    if (!token || !email){
        return ('Something has gone wrong. Please wait to be redirected')
    }

    if (sessionEmail !== email){
      return ('Something has gone wrong.')
    }

  

  return (
    <form action={formAction}>
      
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Email */}
        <div className="mb-4">
          <label>
            Email
          </label>
          <div className="relative">
            <input type="hidden" name="email" id="email" value={email} />
            <p>{email}</p>
          </div>          
        </div>
        {/*Hidden token section */}
        <div>
          <input type="hidden" name="token" id="token" value={token} />
        </div>
        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        
        <Button type="submit">Click to delete all records associated with your account and log out</Button>
      </div>
      <div id="error-message" aria-live="polite" aria-atomic="true">
              {state.message &&              
                <p className="mt-2 text-sm text-red-500" >
                  {state.message}
                </p>
              }
      </div>
      <div id="link" aria-live="polite" aria-atomic="true">
              {state.linkParams &&
              <Link
                className="mt-2 text-sm text-red-500" 
                href={`/account/delete/${state.linkParams}`}
              >Click to send a new email</Link>               
              }
      </div>
      
    </form>
  );
}
