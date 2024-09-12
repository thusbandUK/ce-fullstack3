//"use client";

import { fetchFlashcards } from "@/app/lib/data"
import DOMPurify from "isomorphic-dompurify";
import IndividualFlashcard from "./individual-flashcard/IndividualFlashcard";
import { createContext, useContext, useState } from 'react';
import { Flashcard } from "@/app/lib/definitions";
//import { ThemeContext } from "@/app/flashcards/page";

export default async function FlashcardPresentation() {

    //const theme = useContext(ThemeContext);

    //fetch data from server
    const flashcardData = await fetchFlashcards();

    if (!flashcardData || flashcardData.length === 0) {        
        return <p className="mt-4 text-gray-400">No data available.</p>;
      }

      
   // const clean = DOMPurify.sanitize(dirtyString);
    
return (
  
    <div>
      
        {flashcardData.map((flashcard) => (
            <div key={flashcard.id} className="flex flex-col items-center gap-2">
              <IndividualFlashcard 
              flashcardData={flashcard}
              />              
              {/*<p>{flashcard.multiple_choice_responses}</p>
              <p>{flashcard.checklist}</p>*/}
            </div>
          ))}
    </div>
    
)
}