"use server"

import { redirect } from "next/navigation"
import { signIn, auth, providerMap } from "@/auth"
import { AuthError } from "next-auth"
 
const SIGNIN_ERROR_URL = "/error"

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
    <div className="flex flex-col gap-2">
      {/*<form
        action={async (formData) => {
          "use server"
          try {
            //await signIn("credentials", formData)
            //console.log()
            await signIn("credentials", formData)
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
            }
            throw error
          }
        }}
      >
        <label htmlFor="email">
          Email
          <input name="email" id="email" />
        </label>
        <label htmlFor="password">
          Password
          <input name="password" id="password" />
        </label>
        <input type="submit" value="Sign In" />
      </form>*/}
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async (formData) => {
            "use server"
            try {
              await signIn(provider.id, formData, {                
                redirectTo: props.searchParams?.callbackUrl ?? "",
              })
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
              }
 
              // Otherwise if a redirects happens Next.js can handle it
              // so you can just re-throw the error and let Next.js handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error
            }
          }}
        >
            <label htmlFor="email">
          Email
          <input name="email" id="email" />
        </label>
          <button type="submit">
            <span>Sign in with {provider.name}</span>
          </button>
        </form>
      ))}
    </div>
  )
}