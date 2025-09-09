import Link from "next/link";

const Sent = async () => {
              
    return (
        <>
          <h1>Email sent!</h1>
          <p>A message has been sent to your email account. Open the message and click the link to delete your account. &#40;You might need to check your spam folder&#41;</p>
          <h3>No email received?</h3>
          <Link
            href='/account/delete/none'            
          >Click to send another email</Link>
          
        </>
    )
}

export default Sent;