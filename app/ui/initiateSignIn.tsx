import { betterAuthSignIn } from '../lib/actions';
import { locationParser } from '../lib/functions';
import BottomRow from './dashboard/bottomRow';
import LeftHandColumn from './dashboard/leftHandColumn';
import RightHandColumn from './dashboard/rightHandColumn';
import GoogleButton from './dashboard/googleButton';
import IndividualElephantContainer from '../animation/individualElephantContainer';

export function InitiateSignIn({
  location,
  error
}: {
  location: string | null,
  error: boolean 
}) {
  
  /*This function effectively renders a button (on the login page), which directs the user to the 
  signin page

  function here:
  await signIn(provider, { redirectTo: whereToRedirect});

  function on signIn page
  await signIn(provider.id, formData, {                
                redirectTo: props.searchParams?.callbackUrl ?? "",
              })  
  
  The function is passed the location via imperfect nextauth code with the following drawbacks:

  1) the code has a bug so that there's this bizarre infinite regression link generate with a callbackUrl
  within a callbackUrl. This is addressed by the function cleanUpUrl in authFunctions.ts

  2) if there is no location, ie: user clicks the account to sign in rather than being redirected from,
  eg: the flashcards menu, the param value is stored as undefined. Meanwhile, TypeScript likes to think
  of it potentially as being null. The imported function locationParser returns an empty string for any
  null or undefined values, so that .length === 0 logic can be applied to omit location params from
  the callbackUrl

  The callbackUrl nextauth function will direct users who have just logged in to the /account root page.
  If no location has been specified, the param is not included in the callbackUrl. If it is specified
  it is included again as a location param for the user's landing on the account root page.

  Note that if it is the user's first sign in, they are redirected to input their user name and confirm
  their newsletter subscription settings before being redirected either back to the account root page
  or to their pre-login location 

  Notice as well: there is a redirectTo option here and then another one in the signin page, this
  redirect (identified from params in parent login component as "location") then becomes the 
  callbackUrl params in the next function (signin page)

  */  
  
  //const parsedLocation = locationParser(location);
  const parsedLocation = "flashcards"

  return (
    
      <BottomRow>
        <LeftHandColumn>
          <div className="spacer"></div>
          <form
            action={async () => {              
            "use server"
            await betterAuthSignIn(parsedLocation)        
            }}
          >
            {
              error ?
              <p>Looks like something went wrong! Click sign in to try again.</p>
              :
              <p>Click to sign in or sign up to Chemistry Elephant via Google</p>
            }
            <div className="spacer"></div>
            <div className="flex justify-center">
              {/**<GoogleButton />*/}
              <button type="submit">Click here</button>
            </div>
          </form>
        </LeftHandColumn>
        <RightHandColumn>
          <div className="m-5">
            <IndividualElephantContainer />
          </div>
        </RightHandColumn>
      </BottomRow>    
  )
}