import type { BetterAuthPlugin } from "better-auth";
//import { createAuthEndpoint } from "better-auth/api";
//import { createAuthMiddleware } from "better-auth/plugins";

export const encryptionData = ()=>{
    return {
        id: "encryptionData",
        
        schema: {
            user: {
                fields: {                    
                    encryptionDataId: {
                        type: "string"
                    }
                },
                modelName: "encryptionData" // optional if you want to use a different name than the key
            }
        }
    } satisfies BetterAuthPlugin
}

/*
hooks: {
    before: [{
            matcher: (context) => {
                //return context.headers.get("x-my-header") === "my-value"
                return context
            },
            handler: createAuthMiddleware(async (ctx) => {
                console.log('middleware before section called 11.31')
                console.log(ctx.body)
                // do something before the request
                return  {
                    context: ctx // if you want to modify the context
                }
            })
        }],
    after: [{
        matcher: (context) => {
            //return context.path === "/sign-up/email"
            console.log('after matcher called')
            console.log(context.path)
            return context.path === "/callback/:id"
            //return context.path === "/definitely-not-this"
        },
        handler: createAuthMiddleware(async (ctx) => {
            console.log('middleware called')
            return
            return ctx
            return {
                context: ctx // if you want to modify the context
            }
            return ctx.json({
                message: "Hello World"
            }) // if you want to modify the response
        })
    }]
},
endpoints: {
    getHelloWorld: createAuthEndpoint("/encryptionData/hello-world", {
        method: "GET",
    }, async(ctx) => {
        console.log('endpoint called')                
        return ctx.json({
            message: "Hello World"
        })
    })
},
onRequest: async (request, context) => {
    console.log('onRequest called from custom plugin')
},*/