'use client';

import { useActionState } from 'react';
import { fetchIndividualFlashcardByCodeInternal } from '../lib/data';
import { CodeState } from '../lib/data';
import ArrowCommand from './dashboard/arrowCommand';
import Altcha from './altcha';

/*
This renders a form which harvests a three letter code, which is server-side validated to ensure 
  a) the code is of the right three-letter format and 
  b) that the code is recognised (ie associated
     with a specific flashcard)
It shows error messages if validation fails, only redirecting the user to the individual flashcard
page if the code is valid

NOTE: form renders altcha tick box to prevent form submission by bots, logic is explained in related
  functions and components. It submits data along with email in formData, which then requires processing
  in executeSignInFunction, which returns error if captcha fails

  */


export default function IndividualCardCodeForm() {

  const initialState: CodeState = { message: null, errors: {code: [], altcha: []}};
  const bindCodeFetchIndividualFlashcardByCode = fetchIndividualFlashcardByCodeInternal.bind(null);
  const [state, formAction] = useActionState(bindCodeFetchIndividualFlashcardByCode, initialState);

  return (
    <form action={formAction}>      
      <div className="rounded-md">
        <h6>Get a flashcard</h6>            
        <p>If you are hoping to look up a particular flashcard using a three-letter code from an insta post, enter it below and click submit.</p>            
        <div className="spacer"></div>        
        <div className="mb-4">
          <label htmlFor="flashcard-code">
            Enter code
          </label>
          <div className="relative">
            <input
              className="border-black border rounded-[0.8rem] p-1 w-full md:w-1/2"
              id="flashcard-code"
              name="flashcard-code"
            >              
            </input>
          </div>
          {/**
          <Altcha></Altcha> */}
          <div id="error-message" aria-live="polite" aria-atomic="true">
            {state.message &&
              <p className="mt-2 text-sm text-red-500">
                {state.message}
              </p>
            }
            {state.errors &&
              state.errors.altcha?.map((x) => (
                <p
                  key={x} 
                  className="mt-2 text-sm text-red-500"
                >
                  {x}
                </p>
              ))
            }
            {state.errors &&
              state.errors.code?.map((x) => (
                <p className="mt-2 text-sm text-red-500">
                  {x}
                </p>
              ))
            }
            
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button type="submit">
          <ArrowCommand
            command="SUBMIT CODE"
            borderGray={false}
            disabled={false}
          ></ArrowCommand>                
        </button>
      </div>
    </form>
  );
}