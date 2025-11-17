//"use client";
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SignUpForm from '@/app/ui/signUp';
import HeaderDivs from '@/app/ui/dashboard/header';

export default async function Page({ searchParams }: { searchParams: { location: string, callbackUrl: string | null } }) {

    const session: any = await auth();


    if (!session) {
      redirect('/account/login');
    }

    return (
      <div>
        <HeaderDivs h1Content='Welcome!'/>
            <SignUpForm
              username={''}
              email={session.user?.email}
              location={searchParams.location}
            />
      </div>
    )
}