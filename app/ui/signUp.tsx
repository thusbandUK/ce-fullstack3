'use client';

import ArrowCommand from './dashboard/arrowCommand';
import { State, signUpUser } from '../lib/actions';
import { useFormState } from 'react-dom';
import BottomRow from './dashboard/bottomRow';
import LeftHandColumn from './dashboard/leftHandColumn';
import RightHandColumn from './dashboard/rightHandColumn';

export default function SignUpForm({
  username,
  email,
  location,
}: {
  username: string;
  email: string;
  location: string | null;
}) {

  const initialState: State = { message: null, errors: {username: [], email: []}};
  const signUpUserWithEmail = signUpUser.bind(null, email, location);
  const [state, formAction] = useFormState(signUpUserWithEmail, initialState);

  return (
    <form action={formAction}>
      <BottomRow>
        <LeftHandColumn>
          <h2>Choose username</h2>
          <p className="mt-3">Looks like this is your first time signing in. Please enter a username below.</p>
          <label htmlFor="username" className="mt-3">
            
          </label>
          <div className="relative mt-3">
            <input
              id="username"
              name="username"
              defaultValue={username}
              className="border border-black rounded-sm global-input-width"
            >
            </input>
          </div>
          <div id="username-error" aria-live="polite" aria-atomic="true">
            {state.errors?.username &&
              state.errors.username.map((error: any) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))
            }
          </div>            
          <div className="mb-4">
            <h2 className="mt-3">Newsletter</h2>
            <div className="mt-3">
              <label
                htmlFor="mailTick"
              >
                <p className="inline">
                  Tick if you are happy for Chemistry Elephant to send you emails about special offers and new additions to the website
                </p>
                <input
                  id="mailTick"
                  name="mailTick"
                  type="checkbox"
                  className="mx-3"
                ></input>
              </label>
            </div>
          </div>
        </LeftHandColumn>
        <RightHandColumn>
          <div className="m-5">
            <button type="submit">
              <ArrowCommand
                command={"CONFIRM"}
                borderGray={false}
                disabled={false}
              />
            </button>
          </div>
        </RightHandColumn>
      </BottomRow>
    </form>
  );
}