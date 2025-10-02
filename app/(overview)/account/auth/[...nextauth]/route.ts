//this directs user back to the app after authentication via third party users

/*
Note that the exact same handlers can be found in the original architecture of /api/auth/[...nextauth]
When the login email is clicked to direct the user back to the site, these handlers have to be available
to authenticate the user email and token. 

The url for such in the previous architecture was host/api/auth/callback/nodemailer etc.

with this new architecture it's host/auth/callback/nodemailer etc.

*/

import { handlers } from "@/auth";
export const { GET, POST } = handlers;