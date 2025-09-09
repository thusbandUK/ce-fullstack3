import DeleteConfirm from "@/app/ui/deleteConfirm";
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const Confirm = async () => {
    
    const session: any = await auth();

    if (!session){
      redirect(`/login`);
    }
        
    return (
        <>
          <p>Hello, I&#39;m the confirm page</p>
          <DeleteConfirm
            sessionEmail={session.user?.email}
          >
          </DeleteConfirm>
        </>
    )
}

export default Confirm;