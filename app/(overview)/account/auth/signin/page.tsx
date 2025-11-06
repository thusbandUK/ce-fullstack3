"use server"

import { providerMap } from "../../../../../auth";
import { ExecuteSignIn } from "../../../../ui/executeSignIn";
import HeaderDivs from "../../../../ui/dashboard/header";

/*
This is the custom signin page, note that the example provided wasn't for email but used credentials
in a two step process where the user's password was confirmed and then they could sign in.

As such the email input had to be changed to the bottom form and formData added as a parameter to the 
form action, it seems to work but the error handling is non-existent so this will all need addressing
*/

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined }
}) {

return (
    <>
      <HeaderDivs h1Content={"Login"}/>
      {Object.values(providerMap).map((provider) => (
        <ExecuteSignIn
          provider={provider}
          location={props.searchParams?.callbackUrl === undefined ? null : props.searchParams.callbackUrl}
          key={provider.id}
        ></ExecuteSignIn>
      ))}
    </>
  )
}