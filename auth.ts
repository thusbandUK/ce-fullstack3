/*This is the new auth for better-auth
at current commit, also see _auth and __auth (latter = current working one, former = experimental)

*/

import { betterAuth } from "better-auth";
import { Pool } from "@neondatabase/serverless";
import { nextCookies } from "better-auth/next-js";
import { APIError } from "better-auth/api";
import { encryptUserData, abortUserCreation, updateUserEncryptedData } from "./app/lib/encryption";
import { openAPI } from "better-auth/plugins"

export const auth = betterAuth({
    database: new Pool({ connectionString: process.env.DATABASE_URL }),
    databaseHooks: {
      /*session: {
        create: {
          before: async(session, ctx) => {
            console.log('the userId in session before hook')
            console.log(session.userId)
            console.log('and the ctx')
            console.log(ctx)
            return false;
          }
        }

      },*/
      user: {
        additionalFields: {
          username: {
            type: "string",
            required: true
          },
        },
        create: {
          after: async (user) => {
            
            //encrypt user data
            const encryptedData = await encryptUserData({name: user.name, email: user.email, image: user.image ? user.image : "", id: user.id})

            //if no encryptedData throws error, deletes existing entries in user and encryption_data tables
            if (encryptedData === undefined){
              //deletes existing data
              await abortUserCreation(user.id)
              throw new APIError("NOT_MODIFIED", {
                message: "There was a problem creating your account. Try logging in again.",
            });              
            }
            //overwrites data in user table with encrypted values
            const response = await updateUserEncryptedData({
              id: user.id,
              name: encryptedData.name,
              email: encryptedData.email,
              image: encryptedData.image,
            })

            if (response.success){
              return
            }
            if (response.error){
              //delete user and encryption data where id = user.id and where userId = user.id
              await abortUserCreation(user.id)
              throw new APIError("NOT_MODIFIED", {
                message: "There was a problem creating your account. Try logging in again.",
            });
            }
            return
          },
        },
      },
  },
    socialProviders: {
        google: {
            prompt: "select_account", 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            redirectURI: `http://localhost:3000/api/auth/callback/google`,
            disableImplicitSignUp: false,
            disableSignUp: false,
            newUserCallbackURL: "/account/welcome/signup",
        },  
      },
      plugins: [
        nextCookies(),
        openAPI(),
      ]//make sure last item in 'array' 
})