'use client';

import { State2, renewDelete } from '../lib/deleteAccount';
import { useFormState } from 'react-dom';
import ArrowCommand from './dashboard/arrowCommand';

export default function DeleteRequestRenew({
  email,
  message
}: {
  email: string;
  message: string;
}) {

  const initialState: State2 = { message: null, errors: {email: []}};
  const bindEmailRenewDelete = renewDelete.bind(null, email);
  const [state, formAction] = useFormState(bindEmailRenewDelete, initialState);

  return (
    <form action={formAction}>
      <div className="md:grid md:grid-cols-6 gap-0 w-full items-center justify-center rounded-lg">
        <div className="col-start-1 col-span-6 md:col-span-4 w-full flex flex-col border border-black rounded-lg p-5">{/*COL 1 STARTS */}
          <p>{message}</p>
          <div id="error-message" aria-live="polite" aria-atomic="true">
            {state.message &&
              <p className="mt-2 text-sm text-red-500">
                {state.message}
              </p>
            }
          </div>
        </div>{/*COL 1 ENDS */}

        <div className="col-start-1 h-full md:col-start-5 col-span-6 md:col-span-2 border border-black rounded-lg flex flex-col justify-end">{/*COL 2*/}
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