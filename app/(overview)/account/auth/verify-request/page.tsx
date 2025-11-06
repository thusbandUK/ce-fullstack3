import HeaderDivs from "../../../../ui/dashboard/header";
import BottomRow from "../../../../ui/dashboard/bottomRow";
import LeftHandColumn from "../../../../ui/dashboard/leftHandColumn";
import RightHandColumn from "../../../../ui/dashboard/rightHandColumn";
/*
Custom page to inform the user that an email has been sent and that they should check their emails and
click the link inside and that they may need to check their spam folder
*/

export default async function EmailVerification(){
    return (
        <div>
          <HeaderDivs h1Content="Email sent" />
          <BottomRow>
            <LeftHandColumn>
              <p>You have been sent an email with a link which will enable you to complete the login process</p>
              <div className="spacer"></div>
              <p>You may need to check your spam folder.</p>
            </LeftHandColumn>
            <RightHandColumn>
              <div className="m-5">
                <p>INSERT ELEPHANT</p>
              </div>
            </RightHandColumn>
          </BottomRow>
        </div>
    )
}