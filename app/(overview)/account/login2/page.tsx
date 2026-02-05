import { InitiateSignIn } from '../../../ui/initiateSignIn';
import HeaderDivs from '../../../ui/dashboard/header';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ location: string }> }) {
//export default async function LoginPage() {    

  console.log('account login page 1')
  const { location } = await searchParams;
  //const location = ""
  console.log('account login page 2')
  return (
    <>
     {/**<p>Hello!</p>*/}
   
      <HeaderDivs h1Content='Sign in or sign up' />
      <InitiateSignIn
        location={location ? location : ''}
        error={false}
      />
       
    </>
  );
}