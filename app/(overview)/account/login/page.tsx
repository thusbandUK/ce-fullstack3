import { InitiateSignIn } from '../../../ui/initiateSignIn';
import HeaderDivs from '../../../ui/dashboard/header';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
}

/*
This is the login page, it's probably not really necessary as (implicitly) clicking any signin
button could direct straight to the page where user inputs email. Consider removing.

*/

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ location: string }> }) {

  const { location } = await searchParams;

  return (
    <>
      <HeaderDivs h1Content='Sign in or sign up' />
      <InitiateSignIn
        location={location ? location : ''}
        error={false}
      />
    </>
  );
}