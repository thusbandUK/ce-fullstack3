import { createTransport } from "nodemailer"

/*

This contains functions which can be used to customise the emails received via the nextauth signin
logic. They currently still have the default nextauth styling

nextauth docs: https://next-auth.js.org/providers/email

good example: https://github.com/nextauthjs/next-auth/discussions/1293 

Note the function "cleanUpUrl" in lib/authFunctions.ts, so the url passed to this is the one the user
clicks to authenticate their session and token and such and when you customise the code, it makes
problems here. So the url passed by the nextauth code has this problem with a kind of infinite regression
of the callbackUrl, so "cleanUpUrl" extracts the actual callbackUrl, escapes it and reassembles a url
which is then passed to this function

*/

export function customMailHtml(params: { encodedUpdatedCompleteUrl: string, host: string }) {
  //const { url, host, theme } = params
  
  const { encodedUpdatedCompleteUrl, host } = params
  const escapedHost = host.replace(/\./g, "&#8203;.")

  //const brandColor = theme.brandColor || "#346df1"
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
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
export function customEmailText({ encodedUpdatedCompleteUrl, host }: { encodedUpdatedCompleteUrl: string, host: string }) {
  return `Sign in to ${host}\n${encodedUpdatedCompleteUrl}\n\n`
}