import type { BetterAuthPlugin } from "better-auth";

export const encryptionData = ()=>{
    return {
        id: "encryption-data",
        schema: {
            encryption_data: {
                fields: {                    
                    encrypted_email: {
                        type: "string"
                    }
                },
                modelName: "encryptionData" // optional if you want to use a different name than the key
            }
        }
    } satisfies BetterAuthPlugin
}