import HeaderDivs from "../../../../ui/dashboard/header";
import { InitiateSignIn } from "../../../../ui/initiateSignIn";

export default function SignInError(){

    return (
        <>
          <HeaderDivs h1Content="Error" />
          <InitiateSignIn
            location={null}
            error={true}
          />
        </>
    )
}