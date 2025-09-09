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
        <p>Sorry to hear you want to delete your account. For security reasons, we will send
            you an email containing a link. Clicking the link will return you back to the website,
            at which point you will click one more button to confirm that you wish to delete 
            your account.
        </p>
        
        <DeleteRequest
          email={session.user.email}
        ></DeleteRequest>
        </>
    )
}

export default Delete;