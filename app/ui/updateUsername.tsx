'use client';

import { State, updateUser } from '../lib/actions';
import { useFormState } from 'react-dom';
import { useActionState } from 'react';
import ArrowCommand from './dashboard/arrowCommand';

export default function UpdateUsername({
  username,
  email,  
}: {
  username: string;
  email: string;  
}) {
  
  const initialState: State = { message: null, errors: {username: [], email: []}};
  const updateUserWithNewName = updateUser.bind(null, email);
  const [state, formAction] = useActionState(updateUserWithNewName, initialState);
  
  return (
    <form action={formAction} role="form">
      <div className="w-full flex flex-col pb-4 mx-auto grid grid-cols-6">
      <div className="col-start-1 col-span-6 md:col-span-4 w-full border-2 border-black rounded-lg p-5">{/*COL 1 */}
      
        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username">
            Enter a new username and click update
          </label>
          <div className="spacer"></div>
          <div className="relative">
            <input
              id="username"
              name="username"              
              defaultValue={username}
              className="border border-black rounded-sm global-input-width"
              minLength={5}
              maxLength={20}
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

      </div>{/*COL 1 ENDS */}

      <div className="col-start-1 md:col-start-5 col-span-6 md:col-span-2 border-2 border-black rounded-lg flex flex-col justify-end">{/*COL 2*/}
      <div className="m-5">
        <button type="submit">
          <ArrowCommand
            borderGray={false}
            command={"UPDATE"}
            disabled={false}
          />
        </button>
        </div>
      </div>{/*COL 2 ENDS*/}
      </div>
    </form>
  );
}