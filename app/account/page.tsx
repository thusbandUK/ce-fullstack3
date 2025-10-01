import SignOut from "../ui/dashboard/signOut"
import { SignIn } from '../ui/login-form';
import { auth } from '@/auth';
import Link from "next/link";
import { redirect } from 'next/navigation';

export default async function Account(){

    const session: any = await auth();

    if (!session){      
      redirect(`/account/login`);
    }

    return (
        <div>
            { session ? `Hello, ${session.user.name}` : null}
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