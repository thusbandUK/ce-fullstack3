//"use client";
//import * as jsonArray from '../lib/flashcard-seed-data.json';
//import FlashcardPresentation from '../ui/dashboard/flashcards';
//import DOMPurify from "isomorphic-dompurify";
//import { createContext, useContext, useState } from 'react';
//import { Flashcard } from "@/app/lib/definitions";
import { fetchUser } from '../lib/data';
import { UserData } from '../lib/definitions';
//import Link from 'next/link';
//import { auth } from "auth"
import { auth } from '@/auth';
//import { redirect } from 'next/dist/server/api-utils';
//import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';
//import SignUpForm from '../ui/signUp';

export default async function Page({ searchParams }: { searchParams: { location: string } }) {
  
    const session: any = await auth();

    if (session){
      console.log('session triggered')
      return(<p>Hello!</p>)
    }
    console.log(session);
    console.log(session.user)

    
    console.log('got to line 24')
    if (!session) {
      console.log('no session triggered')
      //notFound();
      redirect('/login');
    }
    console.log('got to line 30')
    if (!session.user.name){
      console.log('!session.user.name triggered')
      if (!searchParams.location){
        console.log('went into !searchParams')
        redirect('/welcome/signup');        
      } else {
        console.log('went into else')
        redirect(`/welcome/signup?location=${searchParams.location}`);
        
      }
      
    }

    console.log('got to line 36')
    //let userEmail: string | null | undefined = '';
    //let userEmail: string = '';

    //if (session.user){
      //userEmail = session.user.email;
    //}
        
    //const userDetails: UserData[] = await fetchUser(userEmail);

    //if (!userDetails.user.name){
      //redirect(`/welcome/signup?location=${searchParams.location}`);
    //}
    //if (!userDetails || userDetails.length === 0){
      //redirect(`/welcome/signup?location=${searchParams.location}`);      
    //}

    //if (searchParams.location){
     // setTimeout(() => {
       // redirect(`${searchParams.location}`);
      //}, 500)      
    //}

    // Wait 3 seconds.
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('got to line 61')
    // Redirect to another route.
    
    if (searchParams.location){
      console.log('searchParams.location triggered')
      redirect(`${searchParams.location}`);
    }
    

    //setTimeout(() => {
      //redirect(`${searchParams.location}`);
    //}, 500) 
    
    
    

    return (
      <div>
        <p>WELCOME PAGE</p>
        
        

        { searchParams.location ? 
          <p>Please wait to be redirected</p>  
          :
          null
        }
        
        {/**
         * {
            userDetails.length === 0 ?
            <div>
            <p>Looks like this is your first time signing in, welcome, please enter your details below...</p>
            <SignUpForm 
              username={session.user?.name}
              email={session.user?.email}
            />
            </div>
             
            :

            <p>Welcome back {userDetails[0].name}</p>
            

        }*/}
        
      </div>
    )
}

/*
{
            session?.user ?
            <div>
            <p>Welcome {session.user.name}</p> 
            <p>Please confirm your email address {session.user.email}</p>
            </div>
            :
            null
        }
*/