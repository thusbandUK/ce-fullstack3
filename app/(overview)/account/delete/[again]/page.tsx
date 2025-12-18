"use server"

import { auth } from '../../../../../auth'
import DeleteRequestRenew from '../../../../ui/deleteRequestRenew';
import { redirect } from 'next/navigation';
import { renewDeleteMessage } from '../../../../lib/functions';
import { headers } from 'next/headers';
import { decryptUserData } from '@/app/lib/encryption';

const Again = async ({ params }: { params: { again: string } }) => {

    //const session: any = await auth();
    const session = await auth.api.getSession({
      headers: await headers() // you need to pass the headers object.
    })

    if (!session){
      redirect(`/login`);
    }

    const { email, id, encryptionDataId } = session.user
    const decryptedEmail = await decryptUserData(email, id, encryptionDataId);
    
    if (!decryptedEmail){
      redirect('/login');
    }

    const message = renewDeleteMessage(params);    

    return (
      <>
        <div className="w-100 mx-auto mt-5">
          <div className="rounded-lg flex flex-col  px-5 py-1 m-auto " style={{border: 'black solid 1px'}}>
            <div className="spacer"></div>
            <h1>New link</h1>
            <div className="spacer"></div>
          </div>
        </div>
        <DeleteRequestRenew
          email={decryptedEmail}
          message={message}
        ></DeleteRequestRenew>
      </>
    )
}

export default Again;