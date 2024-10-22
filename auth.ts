import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Discord from "next-auth/providers/discord"
import TikTok from "next-auth/providers/tiktok"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Discord, TikTok],
})