import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SignUpNewsletter from '@/app/ui/signUpNewsletter';

export default async function ReceiveEmail({ searchParams }: { searchParams: { location: string } }){

    const session: any = await auth();

    if (!session){
      redirect(`/account/login`);
    }

    return (
        <div>
          <h1>Sign up for newsletters</h1>
          <SignUpNewsletter
            email={session.user.email}
            username={session.user.name}
            location={searchParams.location ? searchParams.location : ''}
            receivingNewsletter={session.user.receive_email}
          ></SignUpNewsletter>
        </div>
    )
}