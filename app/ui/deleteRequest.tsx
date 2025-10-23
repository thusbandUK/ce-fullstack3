'use client';

import { Button } from './button'
import { State2, initiateDelete } from '../lib/deleteAccount';
import { useFormState } from 'react-dom';

export default function DeleteRequest({  
  email
}: {  
  email: string;  
}) {
  
  const initialState: State2 = { message: null, errors: {email: []}};
  const bindEmailInitiateDelete = initiateDelete.bind(null, email);
  const [state, formAction] = useFormState(bindEmailInitiateDelete, initialState);  

  return (
    <form action={formAction}>
      
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Email */}
        <div className="mb-4">
          <label>
            Email
          </label>
          <div className="relative">            
            <p>{email}</p>           
          </div>
          <div id="error-message" aria-live="polite" aria-atomic="true">
              {state.message &&              
                <p className="mt-2 text-sm text-red-500" >
                  {state.message}
                </p>
              }
          </div>
          
        </div>
        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        
        <Button type="submit">Send email with link to delete account</Button>
      </div>
      
    </form>
  );
}
