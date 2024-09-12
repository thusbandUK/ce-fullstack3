//"use client";

import { fetchFlashcards } from "@/app/lib/data"
import DOMPurify from "isomorphic-dompurify";
import { useContext } from "react";
//import { ThemeContext } from "@/app/flashcards/page";
//import { FlashcardContext } from "@/app/flashcards/page";

export default function IndividualFlashcard({flashcardData}: {flashcardData: any}) {

   // console.log('logging of flashcard context begisn');
    //console.log(FlashcardContext);
    //console.log('logging of flashcard context ends');
    //const theme = useContext(FlashcardContext);
    //const theme = useContext(ThemeContext);

   //const clean = DOMPurify.sanitize(flashcardData.question);
   const clean = DOMPurify.sanitize(flashcardData.definition, { USE_PROFILES: { html: true } });

   /*const rawHTML = "<button>click me</button>";
return <div dangerouslySetInnerHTML={{ __html: rawHTML }} />;*/

    
return (
    <div>
        
        <p>{flashcardData.question}</p>
        <p dangerouslySetInnerHTML={{ __html: clean }}></p>
    </div>
)
}