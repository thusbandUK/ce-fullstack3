import HeaderDivs from "../../../../ui/dashboard/header";
import LeftHandColumn from "../../../../ui/dashboard/leftHandColumn";
import BottomRow from "../../../../ui/dashboard/bottomRow";
import RightHandColumn from "../../../../ui/dashboard/rightHandColumn";
//import IndividualElephantContainer from "@/app/animation/individualElephantContainer";
//import dynamic from 'next/dynamic';
//const IndividualElephantContainer = dynamic(() => import('../../../../animation/individualElephantContainer'), { ssr: false });
import IndividualElephantContainer from "../../../../animation/individualElephantContainer";


const Goodbye = async () => {

    return (
        <>
          <HeaderDivs h1Content="Goodbye!"></HeaderDivs>
          <BottomRow>
            <LeftHandColumn>
              <div className="m-auto">
                <p>Sorry you are leaving. Hope you have found Chemistry Elephant useful. You know where we are if you need us again.</p>
              </div>
            </LeftHandColumn>
            <RightHandColumn>
              <IndividualElephantContainer />
            </RightHandColumn>
          </BottomRow>
        </>
    )
}

export default Goodbye;