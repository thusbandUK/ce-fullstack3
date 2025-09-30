'use client';

import { Button } from '@/app/ui/button';
import { StateSignUpNewsletter, signUpNewsletter } from '@/app/lib/actions';
import React, { useState } from 'react';
import { useFormState } from 'react-dom';

export default function SignUpNewsletter({
  username,
  email,
  location,
  receivingNewsletter,
}: {
  username: string;
  email: string;
  location: string | null;
  receivingNewsletter: boolean;
}) {  
  const initialState: StateSignUpNewsletter = { message: null, errors: {mailTick: [], email: []}};  
  const signUpUserWithEmail = signUpNewsletter.bind(null, email, location);
  const [state, formAction] = useFormState(signUpUserWithEmail, initialState);  
  const [checked, setChecked] = useState(receivingNewsletter);  
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {    
    return setChecked(event.currentTarget.checked);
  }

  return (
    <form action={formAction}>
      
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Email */}
        <div className="mb-4">
          <label>
            Username:
          </label>
          <div className="relative">
            <p>{username}</p>           
          </div>
          <label
            htmlFor="mailTick"
          >
            { receivingNewsletter ? 
          "You are already signed up for the newsletter, so if you want to keep receiving emails about special offers and new content then you do not to do anything. If you want to unsubscribe, untick the box and press unsubscribe."  
          :
          "You are not currently signed up for the news latter. If you want to receive emails about special offers and new content, tick the box and press subscribe."
          }
            


          </label>
          <input
            id="mailTick"
            name="mailTick"
            type="checkbox"
            defaultChecked={checked}
            onChange={handleChange}
          ></input>
        </div>
        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        
        <Button 
          type="submit"
          className="button-can-disabled"
          id="button-disabled-id"
          disabled={checked===receivingNewsletter}          
        >
          { receivingNewsletter ? "Unsubscribe" : "Subscribe"}
          
        </Button>
      </div>
      
    </form>
  );
}
