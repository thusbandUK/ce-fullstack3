

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

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

export const cipher = (email: string) => {
    const regex = /^[A-Za-z]$/;
    let encryptedEmail = [];    
    for (let x = 0; x < email.length; x++){
        if (regex.test(email[x])){
            const index = alphabet.indexOf(email[x].toLowerCase())
            const newLetter = alphabet[index + 1]
            encryptedEmail.push(newLetter)
        } else {
            encryptedEmail.push(email[x])
        }
    }    
    return encryptedEmail.join("")
}