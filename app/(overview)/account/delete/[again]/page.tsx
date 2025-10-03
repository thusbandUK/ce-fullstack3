"use server"

import { auth } from '@/auth';
import DeleteRequestRenew from '@/app/ui/deleteRequestRenew';
import { redirect } from 'next/navigation';

const Again = async ({ params }: { params: { again: string } }) => {

    const session: any = await auth();

    if (!session){
      redirect(`/login`);
    }    

    let message:string = ""
    
    const filler = "Press the button to send a new one"
      if (params.again){
        switch (params.again){
          case "none":
          message = `Sorry you have not received any message. ${filler}.`
          break;
          case "expired":
          message = `Looks like your link expired. ${filler} and make sure to click the link within one hour.`
          break;
          case "corrupted":
          message = `Looks like there's something wrong with your link. Curious! ${filler}.`
          break;
          case "already":
          message = `We already have a record of you requesting an email to delete your account. ${filler}.`
          break;
          case "wrong":
          message = `The credentials you have supplied do not match those we have stored. Curious! ${filler}.`
        }
      } else {
        message = `Not sure what has happened but press the button if you need a new link to delete your account.`
      }      

    return (
        <>
          <h1>Send a new link</h1>
          <p>{message}</p>
          <DeleteRequestRenew
            email={session.user.email}
          ></DeleteRequestRenew>
        </>
    )
}

export default Again;