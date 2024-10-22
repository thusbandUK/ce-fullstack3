//"use client";
import * as jsonArray from '../lib/flashcard-seed-data.json';
import FlashcardPresentation from '../ui/dashboard/flashcards';
import DOMPurify from "isomorphic-dompurify";
//import { createContext, useContext, useState } from 'react';
//import { Flashcard } from "@/app/lib/definitions";
import { fetchFlashcards, fetchExamboards, fetchUser } from '../lib/data';
import { FlashcardData, ExamboardData, userData, UserData } from '../lib/definitions';
import Link from 'next/link';
//import { auth } from "auth"
import { auth } from '@/auth';
//import { redirect } from 'next/dist/server/api-utils';
import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';
import SignUpForm from '../ui/signUp';

export default async function Page({ searchParams }: { searchParams: { location: string } }) {
  
    const session: any = await auth();
    console.log(session);

    /**/
    if (!session) {
      //notFound();
      redirect('/login');
    }

    //let userEmail: string | null | undefined = '';
    let userEmail: string = '';

    if (session.user){
      userEmail = session.user.email;
    }
        
    const userDetails: UserData[] = await fetchUser(userEmail);

    if (!userDetails || userDetails.length === 0){
      redirect(`/welcome/signup?location=${searchParams.location}`);
    }

    //if (searchParams.location){
     // setTimeout(() => {
       // redirect(`${searchParams.location}`);
      //}, 500)      
    //}

    // Wait 3 seconds.
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // Redirect to another route.
    redirect(`${searchParams.location}`);

    //setTimeout(() => {
      //redirect(`${searchParams.location}`);
    //}, 500) 
    
    
    

    return (
      <div>
        
        <p>Welcome {session.user ? session.user.name : null}!</p>

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