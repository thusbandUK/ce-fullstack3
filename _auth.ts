import NextAuth from "next-auth";
import authConfig from "./authConfig";
import Nodemailer from "next-auth/providers/nodemailer";
import nodemailer from 'nodemailer';
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "@neondatabase/serverless";
import { customMailHtml, customEmailText } from "./authCustomEmail";
import type { Provider } from "next-auth/providers";
import { cleanUpUrl } from "./app/lib/authFunctions";


/*
custom sign in page docs
https://authjs.dev/guides/pages/signin

custom auth email docs, note this requires sendVerificationRequest in below providers expression
note also that the function needed modifying to clean up the url, see note below
https://next-auth.js.org/providers/email#customizing-emails
*/

const providers: Provider[] = [
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

        //vital! this addresses the nextauth callbackUrl bug, which passes what should be the entire
        //url as the callbackUrl, which then has its own callbackUrl
        const encodedUpdatedCompleteUrl = cleanUpUrl(url);

        const transport = nodemailer.createTransport(server);
        await transport.sendMail({
          to: email,
          from,
          subject: `Sign in to ${host}`,
          text: customEmailText({ encodedUpdatedCompleteUrl, host }),
          html: customMailHtml({ encodedUpdatedCompleteUrl, host }),
        });
      },
  }),

]

/*
This maps the providers expression above, which can then be passed to the custom sign in page
*/
export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })

//Nextauth docs say *don't* declare pool variable here (outside handlers expression)
//https://authjs.dev/getting-started/adapters/neon
//Also important (see note in session callback below) is manually to disconnect the session where necessary

/*
Notice the pages option in the below expression, which is where you set the paths to custom auth pages,
such as signin etc. 
Important points: the path is [app]/auth/[given page], eg: [app]/auth/signin, compared to the 
non-custom set up which would be [app]/api/auth/[given page], eg: [app]/api/auth/signin

The non-custom set up is still present in the app, so could probably be deleted

Moreover, although it wasn't specified in the docs, if you use the custom pages option, you still 
need to import / define the handlers that used to be in [app]/api/auth/[...nextauth].route.ts
but now are (also) in [app]/account/auth/[...nextauth].route.ts
*/

export const {handlers, signIn, signOut, auth} = NextAuth(() => {
    //declare pool variable here inside function

    //this is the currently (25-9-25) recommended method in neon / next docs https://neon.com/docs/guides/nextjs
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })

    return {...authConfig,
      adapter: PostgresAdapter(pool),
      callbacks: {
        //see: https://next-auth.js.org/configuration/callbacks
        //also see: https://www.npmjs.com/package/@neondatabase/serverless
        //explaining how pool needs to be manually disconnected
        async session({ session }) {

          const client = await pool.connect();

          try {

            return session

          } catch (e){
            await client.query('ROLLBACK');
            throw e;

          } finally {
            client.release();
            //this is where the pool connection is manually disconnect. It only seems to be necessary
            //in the session callback here and in the middleware
            await pool.end();

          }
        },
      },
    providers,
    //https://next-auth.js.org/configuration/options#pages
    pages: {
      signIn: '/account/auth/signin',
      verifyRequest: '/account/auth/verify-request',
    },
  }
	// other options...
})

//checkout: https://github.com/nextauthjs/next-auth/issues/8357
//and: https://authjs.dev/getting-started/adapters/pg?framework=next-js (this has the sql to set up the session db tables)