//"use server"

//import { auth } from '@/auth';
import DeleteRequest from '@/app/ui/deleteRequest';
import { checkExisting } from '@/app/lib/deleteAccount';
import { redirect } from 'next/navigation';
import { auth } from "../../../../auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { decryptUserData } from '@/app/lib/encryption';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Delete',
}


//const Delete = async () => {
  export default async function Delete(){

  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })
  //  const session: any = await auth();

    if (!session){
        redirect(`/login`);
    }

    const { email, id } = session.user
    const decryptedEmail = await decryptUserData(email, id);
    
    if (!decryptedEmail){
      redirect('/login');
    }

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
              email={decryptedEmail}
            ></DeleteRequest>
          </div>
        </>
    )
}

//export default Delete;