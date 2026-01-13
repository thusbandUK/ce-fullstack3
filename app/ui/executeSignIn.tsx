/*
"use client"

import { Button } from './button';
import ArrowCommand from './dashboard/arrowCommand';
import BottomRow from './dashboard/bottomRow';
import LeftHandColumn from './dashboard/leftHandColumn';
import RightHandColumn from './dashboard/rightHandColumn';
import { useFormState } from 'react-dom';
import { executeSignInFunction } from '../lib/actions';
import { StateExecuteSignIn } from '../lib/actions';
import Altcha from './altcha';
import { useRef } from 'react';

/*This function effectively renders a button (on the login page), which directs the user to the 
  signin page

  function here:
  await signIn(provider, { redirectTo: whereToRedirect});

  function on signIn page
  await signIn(provider.id, formData, {                
                redirectTo: props.searchParams?.callbackUrl ?? "",
              })  
  
  The function is passed the location via imperfect nextauth code with the following drawbacks:

  1) the code has a bug so that there's this bizarre infinite regression link generate with a callbackUrl
  within a callbackUrl. This is addressed by the function cleanUpUrl in authFunctions.ts

  2) if there is no location, ie: user clicks the account to sign in rather than being redirected from,
  eg: the flashcards menu, the param value is stored as undefined. Meanwhile, TypeScript likes to think
  of it potentially as being null. The imported function locationParser returns an empty string for any
  null or undefined values, so that .length === 0 logic can be applied to omit location params from
  the callbackUrl

  The callbackUrl nextauth function will direct users who have just logged in to the /account root page.
  If no location has been specified, the param is not included in the callbackUrl. If it is specified
  it is included again as a location param for the user's landing on the account root page.

  Note that if it is the user's first sign in, they are redirected to input their user name and confirm
  their newsletter subscription settings before being redirected either back to the account root page
  or to their pre-login location 

  Notice as well: there is a redirectTo option here and then another one in the signin page, this
  redirect (identified from params in parent login component as "location") then becomes the 
  callbackUrl params in the next function (signin page)

  NOTE: form renders altcha tick box to prevent form submission by bots, logic is explained in related
  functions and components. It submits data along with email in formData, which then requires processing
  in executeSignInFunction, which returns error if captcha fails

  */  /*

export function ExecuteSignIn({
  location,
  provider,
}: { location: string | null, provider?: {id: string, name: string} } & React.ComponentPropsWithRef<typeof Button>) {

    const initialState: StateExecuteSignIn = { message: null, errors: {email: [], captcha: []}};
    const bindExecuteSignInFunction = executeSignInFunction.bind(null, location, provider);
    const [state, formAction] = useFormState(bindExecuteSignInFunction, initialState);
    const altchaRef = useRef<HTMLInputElement>(null)
    

  return (
    <form
      key={provider?.id}
      action={formAction}
    >
      <BottomRow>
        <LeftHandColumn>
          <div className="spacer"></div>
          <p>Enter your email and click send. You will receive an email containing a link, which you can click to complete the sign in process.</p>
          <div className="spacer"></div>
          <label htmlFor="email">
            <input type="email" name="email" id="email" className="border border-black rounded-sm global-input-width"/>
          </label>
          <div className="mt-3">
            <Altcha
              ref={altchaRef}
            />
          </div>

          <div id="message" aria-live="polite" aria-atomic="true">
            {state.message &&
              <p className="mt-2 text-sm text-red-500" key={state.message}>
                {state.message}
              </p>
            }
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: any) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
          <div id="captcha-error" aria-live="polite" aria-atomic="true">
            {state.errors?.captcha &&
              state.errors.captcha.map((error: any) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
        </LeftHandColumn>
        <RightHandColumn>
          <div className="m-5">
            <button type="submit">
              <ArrowCommand
                command="SEND EMAIL"
                borderGray={false}
                disabled={false}
              />
            </button>
          </div>
        </RightHandColumn>
      </BottomRow>
    </form>
  )
}*/