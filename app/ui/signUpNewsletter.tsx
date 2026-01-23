'use client';

import { StateSignUpNewsletter, signUpNewsletter } from '@/app/lib/actions';
import React, { useState } from 'react';
import { useActionState } from 'react';
import ArrowCommand from './dashboard/arrowCommand';
import clsx from 'clsx';

export default function SignUpNewsletter({
  location,
  receivingNewsletter,
}: {
  location: string | null;
  receivingNewsletter: boolean;
}) {
  const initialState: StateSignUpNewsletter = { message: null, errors: {mailTick: []}};//, email: []}};
  const signUpUserWithEmail = signUpNewsletter.bind(null, location);//email, location);
  const [state, formAction] = useActionState(signUpUserWithEmail, initialState);
  const [checked, setChecked] = useState(receivingNewsletter);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setChecked(event.currentTarget.checked);
  }

  return (
    <form action={formAction}>
      <div className="w-full flex flex-col pb-4 mx-auto grid grid-cols-6">
        <div className="col-start-1 col-span-6 md:col-span-4 w-full border-2 border-black rounded-lg p-5">{/*COL 1 */}
          <div className="rounded-md p-4 md:p-6">

            {/* Message about current subscription status with checkbox to opt in / out */}
            <div className="mb-4">
              <label
                htmlFor="mailTick"
              >
                { receivingNewsletter ?
                  "You are already signed up for the newsletter, so if you want to keep receiving emails about special offers and new content then you do not to do anything. If you want to unsubscribe, untick the box and press unsubscribe."
                  :
                  "You are not currently signed up for the newsletter. If you want to receive emails about special offers and new content, tick the box and press subscribe."
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
            <div id="username-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.mailTick &&
              state.errors.mailTick.map((error: any) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))
            }
          </div>
          </div>
        </div>{/*COL 1 ENDS */}

        <div className="col-start-1 md:col-start-5 col-span-6 md:col-span-2 border-2 border-black rounded-lg flex flex-col justify-end">{/*COL 2*/}
          <div className={clsx("m-5",
              {
                'text-black': checked!==receivingNewsletter,
                'text-slate-400': checked===receivingNewsletter,
              }
            )}
          >
            <button
              type="submit"
              disabled={checked===receivingNewsletter}
            >
              <ArrowCommand
                borderGray={checked===receivingNewsletter}
                command={"UPDATE"}
                disabled={checked===receivingNewsletter}
              />
            </button>
          </div>
        </div>{/*COL 2 ENDS*/}
      </div>
    </form>
  );
}