/*

This contains functions which can be used to compile the html code for emails sent when people request
to delete their account


NOTE: <!--[if !mso]><!--> / <!--[if mso]><!--> notation relates to microsoft outlook. The below template
renders two different emails, one for (the prehistoric) microsoft outlook, the other one for everything 
else. outlook basically doesn't use html or css in a normal way, so you need two different versions.
Currently the outlook one is very simple.
Note that the images only render if they're https:// (and even then google has some issues). It might
be worth having a dev version and a non-dev version, but just keep it in mind for something to fixed

*/

export function customDeleteMailHtml(params: { deleteUrl: string, host: string }) {
    
  const { deleteUrl, host } = params
  
 // const escapedHost = host.replace(/\./g, "&#8203;.")
  
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
        </tr>
      </table>
      <table style="margin: auto; width: 100%; border-spacing: 0;">
        <tr>
          <td style="border: solid black 1px; border-radius: 1.25rem;">
            <p style="padding: 1.75rem; text-align: center;">You have been sent this email in order to delete your account with Chemistry Elephant. To complete the process, click delete below. If you did not request this message, you can safely ignore it.</p>            
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
              href="${deleteUrl}"
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
                    DELETE
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
    <h2>Delete</h2>
    <br/>
    <p>Looks like you are viewing in Microsoft Outlook. Click the link below to complete the process to delete your account with Chemistry Elephant.</p>
    <br/>
    <a href="${deleteUrl}">Delete</a>
    <br/>
    <p>You have been sent this email by Chemistry Elephant as part of the process to delete your account. If you did not request this action, you can safely ignore this email.</p>
  
<![endif]-->
  `
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
export function customDeleteMailText({ deleteUrl, host }: { deleteUrl: string, host: string }) {
  return `Delete ${host} account\n${deleteUrl}\n\n`
}