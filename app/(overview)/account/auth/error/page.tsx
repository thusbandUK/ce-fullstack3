import HeaderDivs from "../../../../ui/dashboard/header";
import { InitiateSignIn } from "../../../../ui/initiateSignIn";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";

export default async function SignInError(){

  //const session: any = await auth();
/*
  if (session){
    redirect(`/account`);
  }*/

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