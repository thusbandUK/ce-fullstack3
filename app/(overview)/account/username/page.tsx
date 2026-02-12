import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import UpdateUsername from "@/app/ui/updateUsername";
import { headers } from "next/headers";
import { getDecryptedUsername } from '../../../lib/actions';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Username',
}

export default async function Account(){

    const session = await auth.api.getSession({
      headers: await headers() // you need to pass the headers object.
    })

    if (!session){
      redirect(`/account/login`);
    }

    const decryptedUsername = await getDecryptedUsername()

    return (
      <div>
        <div className="w-full flex flex-col mx-auto grid grid-cols-6">
          <div className="border-2 w-full flex flex-col border-black rounded-lg px-5 py-1 m-auto col-start-1 col-span-6">
            <div className="spacer"></div>
            <h1>Change username</h1>
            <div className="spacer"></div>
          </div>
          </div>
            <UpdateUsername
              username={decryptedUsername ? decryptedUsername : ""}
            ></UpdateUsername>
          </div>
    )
}