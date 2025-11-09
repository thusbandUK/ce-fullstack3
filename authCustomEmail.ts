import { createTransport } from "nodemailer"

/*

This contains functions which can be used to customise the emails received via the nextauth signin
logic. They currently still have the default nextauth styling

nextauth docs: https://next-auth.js.org/providers/email

good example: https://github.com/nextauthjs/next-auth/discussions/1293 

Notes: 

1) The function "cleanUpUrl" in lib/authFunctions.ts, so the url passed to this is the one the user
clicks to authenticate their session and token and such and when you customise the code, it makes
problems here. So the url passed by the nextauth code has this problem with a kind of infinite regression
of the callbackUrl, so "cleanUpUrl" extracts the actual callbackUrl, escapes it and reassembles a url
which is then passed to this function

2) <!--[if !mso]><!--> / <!--[if mso]><!--> notation relates to microsoft outlook. The below template
renders two different emails, one for (the prehistoric) microsoft outlook, the other one for everything 
else. outlook basically doesn't use html or css in a normal way, so you need two different versions.
Currently the outlook one is very simple.
Note that the images only render if they're https:// (and even then google has some issues). It might
be worth having a dev version and a non-dev version, but just keep it in mind for something to fixd

*/

export function customMailHtml(params: { encodedUpdatedCompleteUrl: string, host: string }) {
    
  const { encodedUpdatedCompleteUrl, host } = params
  
  const escapedHost = host.replace(/\./g, "&#8203;.")
  
  const brandColor = "#346df1"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    //buttonText: theme.buttonText || "#fff",
    buttonText: "#fff",
  }

  return `
  <!--[if !mso]><!-->
  <main style="width: 90%;">
    <table style="margin: auto; width: 100%; border-spacing: 0;">
        <tr>
          <td style="border: solid black 1px; border-radius: 1.75rem;">
            <h1 style="font-size: 1.75rem; padding: 1.75rem; text-align: center;">Chemistry Elephant</h1>
          </td>
        </tr>
        
      </table>
      <table style="margin: auto; width: 100%; border-spacing: 0;">
        <tr>
            
            <td  style="width: 100%; border: 1px solid black; padding: 1rem; border-radius: 1.25rem; vertical-align: middle; text-align: center;">
              <h2>Delete account</h2>
              
            </td>
            <!--<td class="second-row-cell second-row-cell-3"></td>
            
            <td style="width: 30%; border: 1px solid black; border-radius: 1.75rem; position: relative;">
                <div style="margin: auto; position: absolute; width: 80%;  left: 50%; top: 50%; transform: translate(-50%, -50%);">
            <p>centred?</p>  
              <div style="width: inherit;">
                    <h2>Sign in</h2>
                    <h1 style="font-size: 1.75rem; padding: 1.75rem; text-align: center;">Chemistry Elephant</h1>
                </div>
            -->
        </tr>
      </table>
      <table style="margin: auto; width: 100%; border-spacing: 0;">
        <tr>
          <td style="border: solid black 1px; border-radius: 1.25rem;">
            <p style="padding: 1.75rem; text-align: center;">You have been sent this email in order to sign in to Chemistry Elephant. To complete the process, click sign in below.</p>            
          </td>
        </tr>
        
      </table>
      <table style="border-spacing: 0;">
        <tr>
          <td style="width: 50%; border: 1px solid black; border-radius: 1.25rem; vertical-align: middle; text-align: center;">
            <div style="width: 80%; margin: 0% auto; padding-top: 5%;">
                <img src="https://ce-fullstack3-hzaf.vercel.app/pink-elephant-transparent-background.png" style="width: 100%; height: auto;">
            </div>
          </td>
          <td style="width: 50%; border: 1px solid black; border-radius: 1.25rem; padding: 5%; vertical-align: bottom;">            
            <a
              href="${encodedUpdatedCompleteUrl}"
              style="cursor: pointer; text-decoration: none;"
              target="_blank"
            >
              <table  style="border-spacing: 0;">
                <tr>
                  <td style="width: 30%;">
                    <div style="border: 1px solid black; border-radius: 1.25rem; padding: 15%; padding-top: 25%; ">
                      <img src="https://ce-fullstack3-hzaf.vercel.app/right-arrow.png" style="width: 100%; height: auto;">
                    </div>
                  </td>
                  <td style="vertical-align: middle; padding-left: 7.5%; color: black;">
                    SIGN IN
                  </td>
                </tr>
              </table>
            </a>
          </td>
        </tr>
      </table>
    </main>
  <!--<![endif]-->
  <!--[if mso]>
    <h1>Chemistry Elephant</h1>
    <br/>
    <h2>Sign in</h2>
    <br/>
    <p>Looks like you are viewing in Microsoft Outlook. Click the link below to complete the sign in process.</p>
    <br/>
    <a href="${encodedUpdatedCompleteUrl}">Sign in</a>
    <br/>
    <p>You have been sent this email by Chemistry Elephant as part of the signing in process. If you did not request to sign in, you can safely ignore this email.</p>
  
<![endif]-->
  `
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
export function customEmailText({ encodedUpdatedCompleteUrl, host }: { encodedUpdatedCompleteUrl: string, host: string }) {
  return `Sign in to ${host}\n${encodedUpdatedCompleteUrl}\n\n`
}

/*
 `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${encodedUpdatedCompleteUrl}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`

*/