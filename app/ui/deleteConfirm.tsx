'use client';

import { State3, confirmDelete } from '../lib/deleteAccount';
import { useFormState } from 'react-dom';
import { useSearchParams } from 'next/navigation'
import Link from "next/link";
import LeftHandColumn from './dashboard/leftHandColumn';
import RightHandColumn from './dashboard/rightHandColumn';
import BottomRow from './dashboard/bottomRow';
import ArrowCommand from './dashboard/arrowCommand';
import { useEffect, useTransition, useState } from 'react';
import { autoSignOut } from '../lib/deleteAccount';

export default function DeleteConfirm({
  sessionEmail
}: {
  sessionEmail: string;
}) {

  const initialState: State3 = { message: null, linkParams: null, errors: {email: [], token: []}};
  const bindFormDataConfirmDelete = confirmDelete.bind(null);
  const [ state, formAction ] = useFormState(bindFormDataConfirmDelete, initialState);
  const [ isPending, startTransition ] = useTransition();
  const [ clientSideError, setClientSideError ] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!token || !email){
      setClientSideError("Problem with your link, you need to request a new one.")
    }
    if (sessionEmail === email){
      return
    }
    startTransition(async () => {
      await autoSignOut();
    })
    }, [])

  return (
    <form action={formAction}>
      <BottomRow>
        <LeftHandColumn>
          <p>Sorry you are leaving. Hope you have found Chemistry Elephant useful. You know where we are if you need us again.</p>
          {/*Hidden email section */}
          <div className="relative">
            <input type="hidden" name="email" id="email" value={ email === null ? undefined : email} />
          </div>
          {/*Hidden token section */}
          <div>
            <input type="hidden" name="token" id="token" value={token === null ? undefined : token} />
          </div>
          <p>Click confirm to delete all records associated with your account and log out</p>
          <div id="error-message" aria-live="polite" aria-atomic="true">
            {state.message &&
              <p className="mt-2 text-sm text-red-500">
                {state.message}
              </p>
            }
            {clientSideError &&
              <p className="mt-2 text-sm text-red-500">
                {clientSideError}
              </p>
            }
          </div>
        </LeftHandColumn>
        <RightHandColumn>
          <div className="m-5" id="link" aria-live="polite" aria-atomic="true">
            {clientSideError || state.message?
              <Link
                href={`/account/delete/${state.message ? state.linkParams: 'corrupted'}`}
              >
                <ArrowCommand
                  command={"NEW LINK"}
                  borderGray={false}
                  disabled={false}
                />
              </Link>
              :
              <button type="submit">
                <ArrowCommand
                  command={"CONFIRM"}
                  borderGray={false}
                  disabled={false}
                />
              </button>
            }
          </div>
        </RightHandColumn>
      </BottomRow>
    </form>
  );
}