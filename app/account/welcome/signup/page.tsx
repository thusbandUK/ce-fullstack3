//"use client";
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SignUpForm from '@/app/ui/signUp';

export default async function Page({ searchParams }: { searchParams: { location: string, callbackUrl: string | null } }) {

    const session: any = await auth();


    if (!session) {
      redirect('/account/login');
    }

    return (
      <div>
        <p>Welcome!</p>
            <p>Looks like this is your first time signing in, welcome, please enter your details below...</p>
            <SignUpForm
              username={''}
              email={session.user?.email}
              location={searchParams.location}
    />
      </div>
    )
}