import React from 'react';
import { InitiateSignIn } from '../../../ui/initiateSignIn';
import HeaderDivs from '../../../ui/dashboard/header';
 
/*
This is the login page, it's probably not really necessary as (implicitly) clicking any signin
button could direct straight to the page where user inputs email. Consider removing.
*/

export default function LoginPage({ searchParams }: { searchParams: { location: string } }) {

  return (
    <>
      <HeaderDivs h1Content='Login' />
      <InitiateSignIn
        location={searchParams.location ? searchParams.location : ''}
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