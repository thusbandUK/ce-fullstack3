"use server"

//"use client";
//import { createContext, useContext, useState } from 'react';
//import { Flashcard } from "@/app/lib/definitions";
import { fetchExamboards } from '../lib/data';
import { ExamboardData } from '../lib/definitions';
import Link from 'next/link';
//import { auth } from "auth";
import MenuItem from '../ui/dashboard/menuItem';
import { auth } from "@/auth";
import { Session } from "next-auth";
import { fetchUser } from "@/app/lib/data";
import { incrementExamboard } from '../lib/actions';

export default async function Page() {

    const examboardsData = await fetchExamboards();   

    //if users show interest by clicking on an examboard that currently has no flashcards, this
    //transforms the event into a database call which logs the number of button clicks for that
    //examboard
    const handleLogInterest = async (examBoard: string) => {
      "use server"
      await incrementExamboard(examBoard);
      return;
    }

    return (
      <div className='w-11/12 md:w-4/5 mx-auto mt-10'>        
        
        <h1>Select your examboard</h1>
        <div className="grid md:grid-cols-3 gap-0 mt-10">
          {examboardsData.map((x: ExamboardData) => (
            <div key={x.id} className="border-2 border-black rounded-lg p-5">
              <MenuItem
                heading={x.examboard}
                content={x.description}
                link={`/flashcards/${x.id}/topic`}
                modal={!x.has_flashcards}
                identifier={x.id}
                receiveEmail={null}
                logInterest={handleLogInterest}
              >              
              </MenuItem>
            </div>
          ))}        
        </div>        
      </div>
    )
}