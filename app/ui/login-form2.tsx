import { Button } from './button';
import { signIn } from "@/auth"


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
  
  //console.log('children')
  //console.log(children);
  console.log('props');
  console.log(props);

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


