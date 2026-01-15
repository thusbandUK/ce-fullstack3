import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    //baseURL: "http://localhost:3000",
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [inferAdditionalFields<typeof auth>(
        {
            user: {
                receive_email: {
                  type: "boolean",
                },
                username: {
                    type: "string",
                }
            }
        }
    )],
})

export const { signIn, signUp, useSession } = createAuthClient()