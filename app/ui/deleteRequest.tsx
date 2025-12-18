'use client';

import { State2, initiateDelete } from '../lib/deleteAccount';
import { useFormState } from 'react-dom';
import { useActionState } from 'react';
import ArrowCommand from './dashboard/arrowCommand';
import { betterAuthDeleteUser } from '../lib/actions';
import { authClient } from '../../auth-client';
//import { authClient } from '@/auth-client';

export default function DeleteRequest({
  email
}: {
  email: string;
}) {

  const initialState: State2 = { message: null, errors: {email: []}};
  const bindEmailInitiateDelete = initiateDelete.bind(null, email);
  //const bindBetterAuthDeleteUser = betterAuthDeleteUser.bind(null)
  const [state, formAction] = useActionState(bindEmailInitiateDelete, initialState);
  //const [state, formAction] = useFormState(bindBetterAuthDeleteUser, initialState);
  //const [state, formAction] = useActionState(bindBetterAuthDeleteUser, initialState);

  const deleteUser = async() => {
    await authClient.deleteUser()
  }
  //</form><form action={deleteUser} role="form" name="delete-request-form">
  return (
    
    <form action={formAction} role="form" name="delete-request-form">
      
      <div className="w-full flex flex-col pb-4 mx-auto grid grid-cols-6">
        <div className="col-start-1 col-span-6 md:col-span-4 w-full border-2 border-black rounded-lg p-5">{/*COL 1 */}
          <p>Sorry to hear you want to delete your account. Click delete and we will send you an
            email with a link to the address below. Clicking the link will return you back to the website,
            at which point you will click one more button to confirm that you wish to delete 
            your account.
          </p>
          {/* Email - printed from props, user cannot modify*/}
          <div className="mb-4 mt-4">
            <label>
              Email
            </label>
            <div className="relative">
              <p>{email}</p>
            </div>
            <div id="error-message" aria-live="polite" aria-atomic="true">
              {state.message &&
                <p className="mt-2 text-sm text-red-500">
                  {state.message}
                </p>
              }
            </div>
          </div>
        </div>{/*COL 1 ENDS */}
        <div className="col-start-1 md:col-start-5 col-span-6 md:col-span-2 border-2 border-black rounded-lg flex flex-col justify-end">{/*COL 2*/}
          <div className="m-5">
            <button type="submit">
              <ArrowCommand
                borderGray={false}
                command={"DELETE"}
                disabled={false}
              />
            </button>
          </div>
        </div>{/*COL 2 ENDS*/}
      </div>
    </form>
  );
}