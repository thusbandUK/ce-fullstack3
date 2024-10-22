//import LoginForm2 from '../ui/login-form2';
import React from 'react';
import { SignIn } from '../ui/login-form2';
 

export default function LoginPage({ searchParams }: { searchParams: { location: string } }) {

  //return <SignIn />

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <p>Chemistry Elephant</p>
          </div>
        </div>
        <SignIn 
          location={searchParams.location ? searchParams.location : null}
        />
          
          
          
      </div>
    </main>
  );
}
  //location={searchParams.location ? searchParams.location : null}    