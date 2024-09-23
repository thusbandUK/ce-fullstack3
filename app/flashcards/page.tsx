//"use client";
import * as jsonArray from '../lib/flashcard-seed-data.json';
import FlashcardPresentation from '../ui/dashboard/flashcards';
import DOMPurify from "isomorphic-dompurify";
//import { createContext, useContext, useState } from 'react';
//import { Flashcard } from "@/app/lib/definitions";
import { fetchFlashcards, fetchExamboards } from '../lib/data';
import { FlashcardData, ExamboardData } from '../lib/definitions';
import Link from 'next/link';



export default async function Page() {
    
    //const allFlashcardsData = await fetchFlashcards();
    //let allFlashcardsData: FlashcardData[] = [];
    //let examboardData: ExamboardData[] = [];

    //console.log(allFlashcardsData);
    //console.log(allFlashcardsData.length === 0)
    const examboardsData = await fetchExamboards();

    //console.log(examboardsData);
/*
    const handleSelectionAllCards = async () => {
      const collectedFlashcardsData = await fetchFlashcards();
      return allFlashcardsData = collectedFlashcardsData;
    }

    

    
    if (!allFlashcardsData || allFlashcardsData.length === 0) {        
      return <p className="mt-4 text-gray-400">No data available.</p>;
    }*/

    return (
      <div>
        <p>Select your examboard</p>
        {examboardsData.map((x: ExamboardData) => (
          <div key={x.id}>
            <Link
              href={`/flashcards/${x.id}/topic`}
            >
              {x.examboard}
            </Link>

          </div>
        ))}
        
        {/**
        
        {allFlashcardsData.length === 0 ? 
        <div>
          <button onClick={handleRandomSelection}>
            Random selection of 10 cards from the whole collection
          </button>
          <button onClick={handleSelectionAllCards}>
            All of the cards from the whole collection
          </button>
        </div>
        :
        null
        }
         */}
        {/*
        {allFlashcardsData.length === 0 ?
        null:
        <FlashcardPresentation
          allFlashcardsData={allFlashcardsData}
        />
        }
        * */}
      </div>
    )
}

