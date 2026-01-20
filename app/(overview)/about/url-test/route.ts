import { createChallenge } from "altcha-lib";
import { NextRequest, connection } from 'next/server';
import { Pool } from "@neondatabase/serverless";
import { sql } from '@vercel/postgres';
import { createPool } from '@vercel/postgres';
/*
GET route handler enables the altcha logic to work.
nextjs docs: https://nextjs.org/docs/14/app/api-reference/file-conventions/route
note, there cannot also be a page.tsx file in this same folder, only this route
*/



/*
const pool = new Pool({ 
  host: 'localhost',
  user: 'chemistryelephantadmin',
  password: 'p@ssword',
  //database: 'chemistryelephant',
  database: 'postgres',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  //connectionString: process.env.POSTGRES_URL, 
  connectionString: "postgres://chemistryelephantadmin:p@ssword@localhost:5432",
  connectionTimeoutMillis: 2000,    
})
*/

export async function GET(request: NextRequest, res: NextRequest) {
    //coerces string for TypeScript reasons
    //const hmacKeyString = String(process.env.ALTCHA_HMAC_SECRET)

    const connectionString1 = 'postgresql://localhost/chemistryelephant?user=chemistryelephantadmin&password=Phg6KZv%21as%40LN8pc'
    const connectionString2 = 'postgres://default:LikSs3p7TAdz@ep-royal-dream-a2feexrr-pooler.eu-central-1.aws.neon.tech/verceldb?sslmode=require'

    
    
    //const conString = "postgres://YourUserName:YourPassword@YourHostname:5432/YourDatabaseName";
    const connectionString3 = "postgresql://chemistryelephantadmin:Phg6KZv%21as%40LN8pc@localhost:5432/chemistryelephant";
    const connectionString4 = 'postgresql://localhost/chemistryelephant?user=chemistryelephantadmin&password=p@ssword'

    const connectionString5 = 'jdbc:postgresql://localhost:5432/chemistryelephant?user=chemistryelephantadmin&password=p%40ssword&connectTimeout=30&currentSchema=public&charSet=UTF-8&applicationName=myApp'
    const connectionString6 = 'postgresql://localhost:5432/chemistryelephant?user=chemistryelephantadmin&password=p%40ssword&connectTimeout=30&currentSchema=public&charSet=UTF-8&applicationName=myApp'
    const connectionString7 = 'postgresql://localhost:5432/chemistryelephant?user=chemistryelephantadmin&password=p%40ssword&connectTimeout=30&currentSchema=public&charSet=UTF-8'
    const connectionString8 = "postgresql://chemistryelephantadmin:p@ssword@localhost:5432/chemistryelephant";
    const connectionString9 = 'postgres://localhost/chemistryelephant?user=chemistryelephantadmin&password=p@ssword'
    const connectionString10 = 'postgres://chemistryelephantadmin:p@ssword@localhost:5432'
    //const pool = new Pool({ connectionString: connectionString10 });

    const pool = createPool({
      connectionString: connectionString10,
      
    });

    try {

        // Generate a new random challenge with a specified complexity
        //const result = await pool.query('SELECT * FROM topics;');
        const result = await pool.query('SELECT * FROM topics;');
        /*
        res.status(200).json({
         status: 'up',
         db: 'postgres',
         result: result.rows[0],
        });*/

        console.log(result.rows[0])
        return Response.json({message: "all good"})
       
        return result
      } catch (error: any) {
        console.log('captcha GET route error: ', error)
        // Handle any errors that occur during challenge creation        
        return Response.json({error: 'Something went wrong with your captcha. Give it a refresh and try again.'})

      }
  }