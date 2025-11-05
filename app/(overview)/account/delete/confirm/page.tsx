import DeleteConfirm from "../../../../ui/deleteConfirm";
import { auth } from '../../../../../auth';
import { redirect } from 'next/navigation';
import HeaderDivs from "../../../../ui/dashboard/header";

const Confirm = async () => {

    const session: any = await auth();

    if (!session){
        redirect(`/account/login`);
    }

    return (
        <>
          <HeaderDivs h1Content="Confirm"></HeaderDivs>
          <DeleteConfirm
            sessionEmail={session.user?.email}
          />
        </>
    )
}

export default Confirm;