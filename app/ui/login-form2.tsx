//'use client';

//import { lusitana } from '@/app/ui/fonts';
//import {
  //AtSymbolIcon,
  //KeyIcon,
  //ExclamationCircleIcon,
//} from '@heroicons/react/24/outline';
//import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
//import { handlers } from "@/auth"
//export const { GET, POST } = handlers
import { signIn } from "@/auth"
//import { signIn } from '@/auth';


export default function LoginForm2() {
  //useFormState *was* useActionState
  //const [errorMessage, formAction, isPending] = useFormState(
    //authenticate,
    //undefined,
 // );

  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/welcome" })
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}



