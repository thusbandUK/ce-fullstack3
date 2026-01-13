import type { BetterAuthPlugin } from "better-auth";
//import { createAuthEndpoint } from "better-auth/api";
//import { createAuthMiddleware } from "better-auth/plugins";

export const additionalFieldsPlugin = ()=>{
    return {
        id: "additionalFieldsPlugin",
        schema: {
            user: {
                fields: {                    
                    username: {
                        type: "string"
                    },
                    receive_email: {
                        type: "boolean"
                    }
                },
                modelName: "additionalFieldsPlugin" // optional if you want to use a different name than the key
            }
        }
    } satisfies BetterAuthPlugin
}