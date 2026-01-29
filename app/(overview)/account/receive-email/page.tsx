import { auth } from '../../../../auth'
import { redirect } from 'next/navigation';
import SignUpNewsletter from '../../../ui/signUpNewsletter';
import { headers } from "next/headers";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletter',
}

export default async function ReceiveEmail({ searchParams }: { searchParams: Promise<{ location: string }> }){

    const session = await auth.api.getSession({
      headers: await headers() // you need to pass the headers object.
    })

    const { location } = await searchParams;

    if (!session){
      redirect(`/account/login?location=/account/receive-email${ location ? '?location=' + location : null}`);
    }

    return (
      <div>
        <div className="w-full flex flex-col mx-auto grid grid-cols-6">
          <div className="border-2 w-full flex flex-col border-black rounded-lg px-5 py-1 m-auto col-start-1 col-span-6">
            <div className="spacer"></div>
            <h1>Newsletter</h1>
            <div className="spacer"></div>
          </div>
        </div>

        <SignUpNewsletter
          location={location ? location : ''}
          receivingNewsletter={session.user.receive_email}
        ></SignUpNewsletter>
      </div>
    )
}



    /*
    <div>
          <h1>Sign up for newsletters</h1>
          <SignUpNewsletter
            email={session.user.email}
            username={session.user.name}
            location={searchParams.location ? searchParams.location : ''}
            receivingNewsletter={session.user.receive_email}
          ></SignUpNewsletter>
        </div>
    */