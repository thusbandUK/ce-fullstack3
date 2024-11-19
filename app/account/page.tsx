import SignOut from "../ui/dashboard/signOut"
import { SignIn } from '../ui/login-form2';
import { auth } from '@/auth';

export default async function Account(){

    const session: any = await auth();

    return (
        <div>
            { session ? 
            <SignOut /> 
            : 
            <SignIn 
              location="/account"
            />}
            
            
        </div>
    )
}