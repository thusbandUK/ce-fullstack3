//"use client";
//import * as jsonArray from '../lib/flashcard-seed-data.json';
//import FlashcardPresentation from '../ui/dashboard/flashcards';
//import DOMPurify from "isomorphic-dompurify";
//import { createContext, useContext, useState } from 'react';
//import { Flashcard } from "@/app/lib/definitions";
//import { fetchFlashcards, fetchExamboards, fetchUser } from '../lib/data';
//import { FlashcardData, ExamboardData, userData, UserData } from '../lib/definitions';
//import Link from 'next/link';
//import { auth } from "auth"
import { auth } from '@/auth';
//import { redirect } from 'next/dist/server/api-utils';
//import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';
import SignUpForm from '../../ui/signUp';

export default async function Page({ searchParams }: { searchParams: { location: string } }) {

    const session: any = await auth();
    console.log(session);

    /**/
    if (!session) {
      console.log('no session called');
      redirect('/login');
    }

    //let userEmail: string | null | undefined = '';
    const userEmail: string = '';    
    console.log('got to line 30')

    return (
      <div>        
        <p>Welcome!</p>        
            <p>Looks like this is your first time signing in, welcome, please enter your details below...</p>
            <SignUpForm 
              username={''}
              email={session.user?.email}
              location={searchParams.location}
    />       
      </div>
    )
}

