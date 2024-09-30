import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Google from "next-auth/providers/google"


import Credentials from 'next-auth/providers/credentials';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
 /*
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}*/
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Google],
});

/*
This was the old style of sign in where our database stores their login details incl hashed password

, Credentials({
    async authorize(credentials) {
      const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse(credentials);

      if (parsedCredentials.success) {
        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);
        if (!user) return null;
        const passwordsMatch = await bcrypt.compare(password, user.password);
 
          if (passwordsMatch) return user;
      }

        console.log('Invalid credentials');
        return null;
    },
  
  })

*/