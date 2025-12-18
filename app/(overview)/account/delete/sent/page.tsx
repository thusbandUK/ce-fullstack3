import Link from "next/link";
import ArrowCommand from '../../../../ui/dashboard/arrowCommand';
import { auth } from "../../../../../auth";
//import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const Sent = async () => {

  //const session: any = await auth();
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })

  if (!session){
    redirect(`/account/login`);
  }
  
    return (
        <>
          <div className="w-100 mx-auto mt-5">
            <div className="rounded-lg flex flex-col  px-5 py-1 m-auto " style={{border: 'black solid 1px'}}>
              <div className="spacer"></div>
              <h1>Email sent!</h1>
              <div className="spacer"></div>
            </div>

            <div  className="md:grid md:grid-cols-6 gap-0 w-full items-center justify-center rounded-lg">
              <div className="col-start-1 col-span-6 md:col-span-4 w-full flex flex-col border border-black rounded-lg p-5">
                <p>A message has been sent to your email account. Open the message and click the link to delete your account. &#40;You might need to check your spam folder&#41;</p>
                <p className="my-3">No email received?</p>
                <p>Click to send another email</p>
              </div>
              <div className="col-start-1 md:col-start-5 h-full col-span-6 md:col-span-2 border border-black rounded-lg flex flex-col justify-end">
                <Link
                  href='/account/delete/none'
                >
                  <label htmlFor="response" className="cursor-pointer">
                    <div className="m-5">
                      <ArrowCommand
                        borderGray={false}
                        command="SEND AGAIN"
                        disabled={false}
                      />
                    </div>
                  </label>
                </Link>
              </div>
            </div>
          </div>
        </>
    )
}

export default Sent;