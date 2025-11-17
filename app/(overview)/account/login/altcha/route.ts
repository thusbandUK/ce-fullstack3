import { createChallenge } from "altcha-lib";
import { NextRequest } from 'next/server';

/*
GET route handler enables the altcha logic to work.
nextjs docs: https://nextjs.org/docs/14/app/api-reference/file-conventions/route
note, there cannot also be a page.tsx file in this same folder, only this route
*/

export async function GET(request: NextRequest) {
    //coerces string for TypeScript reasons
    const hmacKeyString = String(process.env.ALTCHA_HMAC_SECRET)

    try {

        // Generate a new random challenge with a specified complexity
        const challenge = await createChallenge({
          hmacKey: hmacKeyString,
          maxNumber: 50_000
        })

        //return challenge
        return Response.json(challenge)
      } catch (error: any) {
        console.log('captcha GET route error: ', error)
        // Handle any errors that occur during challenge creation        
        return Response.json({error: 'Something went wrong with your captcha. Give it a refresh and try again.'})

      }
  }