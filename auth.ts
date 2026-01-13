/*This is the new auth for better-auth
at current commit, also see _auth and __auth (latter = current working one, former = experimental)

*/

import { betterAuth } from "better-auth";
import { Pool } from "@neondatabase/serverless";
import { nextCookies } from "better-auth/next-js";
import { APIError } from "better-auth/api";
import { encryptUserData, abortUserCreation, updateUserEncryptedData } from "./app/lib/encryption";
import { openAPI } from "better-auth/plugins"
import { inferAdditionalFields } from "better-auth/client/plugins";
import { signUpIpAddressLog } from "./app/lib/logging";
import { additionalFieldsPlugin } from "./additionalFieldsPlugin";

export const auth = betterAuth({
    database: new Pool({ connectionString: process.env.DATABASE_URL }),
    databaseHooks: {      
      user: {
        additionalFields: {
          username: {
            type: "string",
            input : false,
            required: true
          },
          receive_email: {
            type: "boolean",
            input : false,
            required: true
          }
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
      session: {
        create: {
          before: async(session) => {

            //generates random code to be stored in database in place of ipAddress (see below)
            const randomSixCharCode = require('crypto').randomBytes(6).toString('hex')
            
            //sends data to be logged in authLog.txt
            const response = await signUpIpAddressLog({
              ipAddressToLog: session.ipAddress ? session.ipAddress : 'no ip address available',
              userIdToLog: session.userId,
              timeToLog: session.createdAt,
              ipAddressCode: randomSixCharCode
            })

            /*passes the random alphanumerical code in place of the ipAddress, which is not to be permanently
              stored at this stage, but if there is any suspicious activity, the ipAddress can be looked up
              from the log
              */
            if (response.success){
              return {
                data: {
                  ...session,
                  ipAddress: randomSixCharCode
                }
              }
            }
            
            //if the authLog logic throws an error, the login is cancelled and any entries already
            //made to the user table deleted
            if (response.error){              
              await abortUserCreation(session.userId)
              return false
            }
          }
        }
      }
      
  },
    socialProviders: {
        google: {
            prompt: "select_account", 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
            disableImplicitSignUp: false,
            disableSignUp: false,
            newUserCallbackURL: "/account/welcome/signup",
        },  
      },
      plugins: [
        nextCookies(),
        openAPI(),
        additionalFieldsPlugin(),
        inferAdditionalFields(
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
      )
      ]//make sure last item in 'array' 
})