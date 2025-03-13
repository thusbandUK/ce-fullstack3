import authConfig from "./authConfig";  
import NextAuth from "next-auth";
import { Pool } from "@neondatabase/serverless";
//import Nodemailer from "next-auth/providers/nodemailer";
import PostgresAdapter from "@auth/pg-adapter"
  



export const {auth: middleware} = NextAuth(() => {  
    //...authConfig,
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
    }
})

/**/
//second previous set up

//export const { auth: middleware } = NextAuth(authConfig)


//first previous set up:

//export { auth as middleware } from "@/auth";