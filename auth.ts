/*This is the new auth for better-auth
at current commit, also see _auth and __auth (latter = current working one, former = experimental)

*/

import { betterAuth } from "better-auth";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "@neondatabase/serverless";
import { nextCookies } from "better-auth/next-js";
import { APIError } from "better-auth/api";
//import { Pool } from "pg";


export const auth = betterAuth({
    database: new Pool({ connectionString: process.env.DATABASE_URL }),    
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
            disableSignUp: false
        },  
      },
      plugins: [nextCookies()]//make sure last item in 'array' 
})