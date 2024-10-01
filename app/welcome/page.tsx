//"use client";
import * as jsonArray from '../lib/flashcard-seed-data.json';
import FlashcardPresentation from '../ui/dashboard/flashcards';
import DOMPurify from "isomorphic-dompurify";
//import { createContext, useContext, useState } from 'react';
//import { Flashcard } from "@/app/lib/definitions";
import { fetchFlashcards, fetchExamboards } from '../lib/data';
import { FlashcardData, ExamboardData } from '../lib/definitions';
import Link from 'next/link';
//import { auth } from "auth"
import { auth } from '@/auth';




export default async function Page() {

    const session = await auth();
    console.log(session);
    
    

    return (
      <div>
        
        <p>Welcome!</p>
        {
            session?.user ?
            <div>
            <p>Welcome {session.user.name}</p> 
            <p>Please confirm your email address {session.user.email}</p>
            </div>
            :
            null
        }
        
      </div>
    )
}

