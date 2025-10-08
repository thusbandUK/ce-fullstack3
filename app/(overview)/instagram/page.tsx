import MenuItem from "@/app/ui/dashboard/menuItem";
import IndividualCardCodeForm from "@/app/ui/individualCardCodeForm";

/*
This renders a page intended for users who land from clicking the link that will be provided in the 
insta bio. You can't easily include clickable links in unpaid posts, so as a work around, I'll leave
posts saying, click the link in the bio and then enter code XXX
*/

export default async function Page() {

return (
    <div className="w-full md:w-4/5 mx-auto">
      <h1>Welcome!</h1>
      <p>
        Looks like you have arrived here from Instagram. You can use the links below either 
        to find out the answer to a question from one of our posts or just check out the site.
      </p>
      <div className="grid md:grid-cols-2 gap-0 mt-10">
        <div key={1} className="border-2 border-black rounded-lg p-5">
          <MenuItem
            heading={'Check out the site'}
            content={'Click select to check out the home page or use the navbar to explore.'}
            link={`/`}
            modalContent={null}
            identifier={null}
            logInterest={null}
            arrowCommand={'SELECT'}
          >
          </MenuItem>
        </div>
        <div key={2} className="border-2 border-black rounded-lg p-5">
          <IndividualCardCodeForm></IndividualCardCodeForm>              
        </div>            
      </div>
    </div>
  )
}