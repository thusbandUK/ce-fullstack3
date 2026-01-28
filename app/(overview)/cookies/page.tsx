import HeaderDivs from "@/app/ui/dashboard/header";
import Section from "@/app/ui/dashboard/section";

export default async function Cookies(){

    // className="m-auto"
         return (
          <>
            <div id="top-of-page" ></div>
            <HeaderDivs h1Content={"Why haven't you asked me about cookies?!"}></HeaderDivs>
            <Section
              keyNumber={1}
              topMargin={false}
            >
              <p>We do not currently use analytical or marketing cookies. The only ones we use are the ones
              you need to sign up and login. So that&#39;s one less thing to worry about, right?</p>

            </Section>
            </>
         )
        }