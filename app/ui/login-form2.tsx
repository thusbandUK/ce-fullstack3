import { Button } from './button';
import { signIn } from "@/auth"
//location,

//location: string | null, 

export function SignIn({
  location,
  provider,
  ...props
}: { location: string | null, provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  console.log(location);
  console.log(provider);
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider, { redirectTo: location ? `/welcome?location=${location}` : '/welcome' })
        ////await signIn(provider, { redirectTo: `/` })
      }}
    >
      <Button {...props}>Sign In</Button>
    </form>
  )
}

/*
export default function LoginForm2(
  {
    location, 
    provider,    
  ...props
  }: {
    location: string | null,
    provider?: string    
  }
  & React.ComponentPropsWithRef<typeof Button>) {
  
  

  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider, { redirectTo: `/welcome?location=${location}` })
      }}
    >
      
      <Button {...props}>Sign In</Button>
    </form>
  );
}

//<button type="submit">Signin with Google</button>

*/
