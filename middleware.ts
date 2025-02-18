import authConfig from "./authConfig";  
import NextAuth from "next-auth";  
  
export const { auth: middleware } = NextAuth(authConfig)


//previous set up:

//export { auth as middleware } from "@/auth";