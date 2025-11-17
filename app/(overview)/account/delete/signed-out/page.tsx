"use server"

import HeaderDivs from "../../../../ui/dashboard/header";
import BottomRow from "../../../../ui/dashboard/bottomRow";
import LeftHandColumn from "../../../../ui/dashboard/leftHandColumn";
import RightHandColumn from "../../../../ui/dashboard/rightHandColumn";
import { InitiateSignIn } from "../../../../ui/initiateSignIn";

export default async function Page(){

    return (
        <div>
          <HeaderDivs h1Content={"Logged out"}/>
          <BottomRow>
            <LeftHandColumn>
              <p>
                Something went wrong so you have been automatically signed out.
              </p>
              <p>
                In order to delete your account, please sign back in to the account you wish
                to delete, then click the delete link from your email again.
              </p>
            </LeftHandColumn>
            <RightHandColumn>
              <div className="m-5">
                <InitiateSignIn
                  location={'account/delete/sent'}
                  error={false}
                />
              </div>
            </RightHandColumn>
          </BottomRow>
        </div>
    )
}