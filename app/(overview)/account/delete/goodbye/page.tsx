import HeaderDivs from "../../../../ui/dashboard/header";
import LeftHandColumn from "../../../../ui/dashboard/leftHandColumn";
import BottomRow from "../../../../ui/dashboard/bottomRow";
import RightHandColumn from "../../../../ui/dashboard/rightHandColumn";

const Goodbye = async () => {

    return (
        <>
          <HeaderDivs h1Content="Goodbye!"></HeaderDivs>
          <BottomRow>
            <LeftHandColumn>
              <p>Sorry you are leaving. Hope you have found Chemistry Elephant useful. You know where we are if you need us again.</p>
            </LeftHandColumn>
            <RightHandColumn>
              <div className="m-5">
                <p>INSERT ELEPHANT</p>
              </div>
            </RightHandColumn>
          </BottomRow>
        </>
    )
}

export default Goodbye;