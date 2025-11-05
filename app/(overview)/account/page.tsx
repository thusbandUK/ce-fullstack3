import SignOut from "@/app/ui/dashboard/signOut";
import { InitiateSignIn } from "@/app/ui/initiateSignIn";
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import MenuItem from '../../ui/dashboard/menuItem';

export default async function Account({ searchParams }: { searchParams: { location: string } }){
  
    const session: any = await auth();

    if (!session){
      redirect(`/account/login`);
    }

    if (!session.user.name){
      if (!searchParams.location){
        redirect('/account/welcome/signup');
      } else {
        redirect(`/account/welcome/signup?location=${searchParams.location}`);
      }
    }

    if (session){
      if (searchParams.location){
        redirect(searchParams.location)
      }
    }

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
              <h1 className="m-auto md:ml-10 p-5">{ session ? `Welcome, ${session.user.name}!` : 'Welcome!'}</h1>
            </div>          
            <div  className="md:grid md:grid-cols-2 gap-0 w-full items-center justify-center rounded-lg" >
              <div className="border border-black rounded-lg p-5 h-full">          
                { session ?
                  <SignOut />
                  :
                  <InitiateSignIn
                    location="/account"
                  />}
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