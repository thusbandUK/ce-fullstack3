"use server"

import { auth } from '@/auth';
import DeleteRequest from '@/app/ui/deleteRequest';
import { checkExisting } from '@/app/lib/deleteAccount';
import { redirect } from 'next/navigation';

const Delete = async () => {

    const session: any = await auth();

    if (!session){
        redirect(`/login`);
    }

    const existingCredentials: any = await checkExisting(session.user.email);

    return (
        <>
          <div>
            <div className="w-full flex flex-col mx-auto grid grid-cols-6">
              <div className="border-2 w-full flex flex-col border-black rounded-lg px-5 py-1 m-auto col-start-1 col-span-6">
                <div className="spacer"></div>
                <h1>Delete account</h1>
                <div className="spacer"></div>
              </div>
            </div>
            <DeleteRequest
              email={session.user.email}
            ></DeleteRequest>
          </div>
        </>
    )
}

export default Delete;