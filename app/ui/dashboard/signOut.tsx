import { signOut } from '@/auth';
import ArrowCommand from './arrowCommand';

export default async function SignOut () {
    return (
          <div className="flex h-full flex-col justify-between">
            <div>
              <h6>Sign out</h6>
              <p>Click to sign out</p>
              <div className="spacer"></div>
            </div>
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button>
                <ArrowCommand
                  borderGray={false}
                  command={"SELECT"}
                ></ArrowCommand>
              </button>
            </form>
          </div>
    )
}