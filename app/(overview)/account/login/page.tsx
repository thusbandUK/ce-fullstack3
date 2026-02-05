console.log('account login page 0.1')
import React from 'react';
console.log('account login page 0.2')
import { InitiateSignIn } from '../../../ui/initiateSignIn';
console.log('account login page 0.3')
import HeaderDivs from '../../../ui/dashboard/header';
console.log('account login page 0.4')
/*import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
}
 */
/*
This is the login page, it's probably not really necessary as (implicitly) clicking any signin
button could direct straight to the page where user inputs email. Consider removing.

export default async function Page({ params }: { params: Promise<{ examboard_id: string } >}) {
  
    //const session: any = await auth();
    const session: any = fakeSession;
    //const session = null
    
    const {examboard_id} = await params;
*/
console.log('account login page 0.6')
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ location: string }> }) {

  console.log('account login page 1')
  const { location } = await searchParams;
  console.log('account login page 2')
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

/*

    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <p>Chemistry Elephant</p>
          </div>
        </div>
        <SignIn
          location={searchParams.location ? searchParams.location : ''}
        />
      </div>
    </main>
*/