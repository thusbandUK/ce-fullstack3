import NextAuth from "next-auth";
import authConfig from "./authConfig";  
import Nodemailer from "next-auth/providers/nodemailer";
import nodemailer from 'nodemailer';
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "@neondatabase/serverless"
import { customMailHtml, customEmailText } from "./authCustomEmail";

//Nextauth docs say *don't* declare pool variable here
  
export const {handlers, signIn, signOut, auth} = NextAuth(() => {  
    //declare pool variable here inside function
    const pool = new Pool({ 
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionString: process.env.POSTGRES_URL, 
      connectionTimeoutMillis: 2000,
      
    })
    return {...authConfig,
      adapter: PostgresAdapter(pool),      
      callbacks: {
        session({ session, user }) {            
            
            return session
        }
      },
      providers: [  
        Nodemailer({  
            server: {  
                host: process.env.EMAIL_SERVER_HOST,  
                port: Number(process.env.EMAIL_SERVER_PORT),  
                auth: {  
                    user: process.env.EMAIL_SERVER_USER,  
                    pass: process.env.EMAIL_SERVER_PASSWORD,  
                },  
            },  
            from: process.env.EMAIL_FROM,
            async sendVerificationRequest({
              identifier: email,
              url,
              provider: { server, from },
            }) {
              const { host } = new URL(url);
              const transport = nodemailer.createTransport(server);
              await transport.sendMail({
                to: email,
                from,
                subject: `Sign in to ${host}`,
                text: customEmailText({ url, host }),
                html: customMailHtml({ url, host }),
      });
            },
        }),  
    ]}
	// other options...
})

/*

import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Discord from "next-auth/providers/discord"
import TikTok from "next-auth/providers/tiktok"
import Nodemailer from "next-auth/providers/nodemailer"
//import Resend from "next-auth/providers/resend"
//in docs you have nodemailer like so and then insert it into the providers also, but you may need
//actually to have the nodemailer dependency installed for it to work
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "@neondatabase/serverless"

//checkout: https://github.com/nextauthjs/next-auth/issues/8357
//and: https://authjs.dev/getting-started/adapters/pg?framework=next-js (this has the sql to set up the session db tables)

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  // Create a `Pool` inside the request handler.
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  return {
    adapter: PostgresAdapter(pool),
    providers: [Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    })],
  }
})

*/
 /*
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Discord, TikTok, Nodemailer({
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  })],
})
*/