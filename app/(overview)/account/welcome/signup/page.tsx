//"use client";
import { auth } from '../../../../../auth';
import { redirect } from 'next/navigation';
import SignUpForm from '@/app/ui/signUp';
import HeaderDivs from '@/app/ui/dashboard/header';
import { headers } from "next/headers";

export default async function Page({ searchParams }: { searchParams: Promise<{ location: string, callbackUrl: string | null }> }) {

    //const session: any = await auth();
    const session = await auth.api.getSession({
      headers: await headers() // you need to pass the headers object.
  })

  const {location} = await searchParams;

    if (!session) {
      redirect('/account/login');
    }

    return (
      <div>
        <HeaderDivs h1Content='Welcome!'/>
            <SignUpForm
              username={''}
              email={session.user?.email}
              location={location}
            />
      </div>
    )
}