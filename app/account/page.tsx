import SignOut from "../ui/dashboard/signOut";
import { SignIn } from '../ui/login-form';
import { auth } from '@/auth';
import Link from "next/link";
import { redirect } from 'next/navigation';

export default async function Account({ searchParams }: { searchParams: { location: string } }){

    const session: any = await auth();

    if (!session){
      redirect(`/account/login`);
    }

    if (!session.user.name){
      if (!searchParams.location){
        redirect('/account/welcome/signup');
      } else {
        redirect(`/account/welcome/signup?location=${searchParams.location}`);
      }
    }

    if (session){
      if (searchParams.location){
        redirect(searchParams.location)
      }
    }

    return (
        <div>
            { session ? `Welcome back, ${session.user.name}!` : null}
            { session ?
              <SignOut />
            :
            <SignIn
              location="/account"
            />}
            <Link
              href="/account/username"
            >Change username</Link>
            <Link
              href="/account/delete"
            >Delete account</Link>            
        </div>
    )
}