import { z } from "zod"

/*
"use server" modules, like actions.ts and data.ts, cannot export anything other than async functions,
therefore, in order for this UserEmailSchema to be available to both, it has to be exported from this
other module, which is not "use server"
*/

export const UserEmailSchema = z.object({
    validatedEmail: z.string().email("This is not a valid email.")
  })