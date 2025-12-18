import DeleteConfirm from "../../../../ui/deleteConfirm";
import { auth } from '../../../../../auth';
import { redirect } from 'next/navigation';
import HeaderDivs from "../../../../ui/dashboard/header";
import { headers } from "next/headers";
import { decryptUserData } from "@/app/lib/encryption";

const Confirm = async () => {

    //const session: any = await auth();
    const session = await auth.api.getSession({
      headers: await headers() // you need to pass the headers object.
    })

    if (!session){
        redirect(`/account/login`);
    }

    const { email, id, encryptionDataId } = session.user;
    const decryptedEmail = await decryptUserData(email, id, encryptionDataId)

    if (!decryptedEmail){
      redirect('account/login');
    }

    return (
        <>
          <HeaderDivs h1Content="Confirm"></HeaderDivs>
          <DeleteConfirm
            sessionEmail={decryptedEmail}
          />
        </>
    )
}

export default Confirm;