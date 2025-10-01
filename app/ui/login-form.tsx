import { Button } from './button';
import { signIn } from "@/auth";

export function SignIn({
  location,
  provider,
  ...props
}: { location: string | null, provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  
  /*This function effectively renders a button (on the login page), which directs the user to the 
  signin page (?)

  function here:
  await signIn(provider, { redirectTo: whereToRedirect});

  function on signIn page
  await signIn(provider.id, formData, {                
                redirectTo: props.searchParams?.callbackUrl ?? "",
              })  
  
  The fucntion is passed the location via imperfect nextauth code with the following drawback:
  if there is no location, ie: user clicks the account to sign in rather than being redirected from,
  eg: the flashcards menu, an empty string will be passed. The code immediately below passes the
  relative link /welcome if the location string is empty, but if an actual location has been passed,
  it passes that on to the redirectTo option in the signin function below

  Notice as well: there is a redirectTo option here and then another one in the signin page, this
  redirect (identified from params in parent login component as "location") then becomes the 
  callbackUrl params in the next function (signin page)

  */  

  let whereToRedirect = "";
  if (location !== null){
    if (location.length === 0){
      whereToRedirect = '/welcome'
    } else {
      whereToRedirect = location;
    }

  }

  return (
    <form
      action={async () => {
        "use server"        
        await signIn(provider, { redirectTo: whereToRedirect});
      }}
    >
      <Button {...props}>Sign In</Button>
    </form>
  )
}