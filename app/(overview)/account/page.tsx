import SignOut from "@/app/ui/dashboard/signOut";
//import { InitiateSignIn } from "@/app/ui/initiateSignIn";
import { redirect } from 'next/navigation';
import MenuItem from '../../ui/dashboard/menuItem';
import { auth } from "../../../auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { getDecryptedUsername } from "../../lib/actions";

export default async function Account({ searchParams }: { searchParams: Promise<{ location: string }> }){
  
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })

  const { location } = await searchParams;  
  
  if (!session){
     redirect(`/account/login?location=/account`);
   }

  const decryptedUsername = await getDecryptedUsername()
  
    type MenuContentTypeType = {
      heading: string;
      content: string;
      link: string;

    }
    type menuContentType = {
      changeUsername: MenuContentTypeType,
      deleteAccount: MenuContentTypeType,
      newsLetter: MenuContentTypeType,
    }
    const menuContent = {
      changeUsername: {
        heading: "Username",
        content: "Click to change username",
        link: "/account/username"
      },
      deleteAccount: {
        heading: "Delete",
        content: "Click to visit the delete account page",
        link: "/account/delete"
      },
      newsLetter: {
        heading: "Newsletter",
        content: "Click to visit page to update your newsletter subscription settings",
        link: "/account/receive-email"
      }
    }
    return (
        <div>
          <div className="w-100 mx-auto mt-5">
            <div className="rounded-lg flex" style={{border: 'black solid 1px'}}>
              <h1 className="m-auto md:ml-10 p-5">{ session ? `Welcome, ${decryptedUsername}!` : 'Welcome!'}</h1>
            </div>          
            <div  className="md:grid md:grid-cols-2 gap-0 w-full items-center justify-center rounded-lg" >
              <div className="border border-black rounded-lg p-5 h-full">
                <SignOut />                  
              </div>
              {
                Object.keys(menuContent).map((x) => (
                  <div key={x} className="border border-black rounded-lg p-5 h-full">
                    <MenuItem
                      heading={menuContent[x as keyof menuContentType].heading}
                      content={menuContent[x as keyof menuContentType].content}
                      link={menuContent[x as keyof menuContentType].link}
                      modalContent={null}
                      identifier={null}
                      logInterest={null}
                      arrowCommand={"SELECT"}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
    )
}