import authConfig from "./authConfig";
import NextAuth from "next-auth";
import { Pool } from "@neondatabase/serverless";
import PostgresAdapter from "@auth/pg-adapter";

export const {auth: middleware} = NextAuth(() => {
  //declare pool variable here inside function
  //this is the currently (25-9-25) recommended method in neon / next docs https://neon.com/docs/guides/nextjs
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  
    return {...authConfig,
        adapter: PostgresAdapter(pool),
        callbacks: {
          /*
          Another nextauth dev in a forum thread mentioned the below callback is necessary specifically
          in the middleware because otherwise nextauth defaults to jwt strategy (rather than database)
          */
          async session({ session, user }) {

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