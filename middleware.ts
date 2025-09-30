import authConfig from "./authConfig";
import NextAuth from "next-auth";
import { Pool } from "@neondatabase/serverless";
import PostgresAdapter from "@auth/pg-adapter";

export const {auth: middleware} = NextAuth(() => {    
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
          /*
          Another nextauth dev in a forum thread mentioned the below callback is necessary specifically
          in the middleware because otherwise nextauth defaults to jwt strategy (rather than database)
          */
          async session({ session, user }) {
          //modified call back
          const client = await pool.connect();
          
          try {
            
            return session

          } catch (e){
            await client.query('ROLLBACK');
            throw e;

          } finally {
            client.release();
            await pool.end();
          }          
          },
    }
}})