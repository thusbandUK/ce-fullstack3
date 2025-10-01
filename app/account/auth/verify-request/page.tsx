
/*
Custom page to inform the user that an email has been sent and that they should check their emails and
click the link inside and that they may need to check their spam folder

*/


export default async function EmailVerification(){
    return (
        <div>
            <h1>Email sent</h1>
            <p>You have been sent an email with a link which will enable you to complete the login process</p>
            <br></br>
            <p>You may need to check your spam folder.</p>
        </div>
    )
}