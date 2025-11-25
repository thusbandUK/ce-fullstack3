/*This is the new auth for better-auth
at current commit, also see _auth and __auth (latter = current working one, former = experimental)

*/

import { betterAuth } from "better-auth";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "@neondatabase/serverless";
import { nextCookies } from "better-auth/next-js";
import { APIError } from "better-auth/api";
import { cipher } from "./app/lib/authFunctions";
import { encryptionData } from "./encryptionPlugIn"; 


export const auth = betterAuth({
    database: new Pool({ connectionString: process.env.DATABASE_URL }),
    databaseHooks: {
      user: {
        additionalFields: {
          encryptedEmail: {
            type: "string",
            required: false
          }
        },
        create: {
          before: async (user, ctx) => {
            // Modify the user object before it is created           
            return {
              data: {
                // Ensure to return Better-Auth named fields, not the original field names in your database.
                ...user,
                //email: cipher(user.email),
              },
            };
          },
          //after: async (user) => {
            //perform additional actions, like creating a stripe customer
          //},
        },
        deleteUser: {
          enabled: true,
        },
      },
      encryptionData: {
        create: {
          before: async () => {
            // Modify the user object before it is created         
            console.log('encryptionData create was called')  
            return {              
              data: {
                // Ensure to return Better-Auth named fields, not the original field names in your database.
                //...user,
                //email: cipher(user.email),
                message: "Hello world!"
              },
            };
          },

      }
    },
  },
    
    socialProviders: { 
        //github: { 
          //clientId: process.env.GITHUB_CLIENT_ID as string, 
         // clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        //},
        google: {
            prompt: "select_account", 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            redirectURI: `http://localhost:3000/api/auth/callback/google`,
            disableImplicitSignUp: false,
            disableSignUp: false,
            newUserCallbackURL: "/account/welcome/signup",
            /*mapProfileToUser: (profile) => {
              //console.log('mapProfileToUser called and profile...')
              //console.log(profile)
              return {
                encryptedEmail: cipher(profile.email),                
              };
            }*/
        },  
      },
      plugins: [nextCookies(), encryptionData()]//make sure last item in 'array' 
})