

/*
When you customise the signin page, the nextauth codebase
has a bug which makes this strange sort of infinite regression of the callback url which crashes it.
So this takes the buggy url passed to the sendVerificationRequest (custom version of which created in auth.ts),
 and then debugs it, by extracting the actual callbackUrl from the
stated callbackUrl, then replacing the stated callbackUrl in the url passed to the function
with the actualCallbackUrl via a regex expression
*/

export const cleanUpUrl = (url: string) => {
        //extracts params from url passed to function
        const params = new URL(url).searchParams;        
        
        //what has been passed as the callbackUrl param
        const supposedCallbackUrl = params.get("callbackUrl");
       
        //extracts the actual callbackUrl
        const actualCallbackUrl = supposedCallbackUrl !== null ? new URL(supposedCallbackUrl).searchParams.get("callbackUrl"): "/";

        //encodes the actual callbackUrl to escape characters like / etc.
        let encodedActualCallbackUrl = ""

        if (actualCallbackUrl !== null){
          encodedActualCallbackUrl = encodeURIComponent(actualCallbackUrl);
        }

        //regex expression that matches the whole of the supposedCallbackUrl (with the mistake)
        const regexCallback =/(?<=callbackUrl=).*?(?=&token)/
        
        //replaces the supposedCallbackUrl with the encodedActualCallbackUrl in the supplied url
        const cleanedUpUrl = url.replace(regexCallback, encodedActualCallbackUrl)
        
        return cleanedUpUrl;        
        
}