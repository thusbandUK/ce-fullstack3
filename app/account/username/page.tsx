import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import UpdateUsername from "@/app/ui/updateUsername";

export default async function Account(){

    const session: any = await auth();

    if (!session){
      redirect(`/login`);
    }

    return (
        <div>
          <h1>Change username</h1>
          <UpdateUsername
            email={session.user.email}
            username={session.user.name}
          ></UpdateUsername>
        </div>
    )
}