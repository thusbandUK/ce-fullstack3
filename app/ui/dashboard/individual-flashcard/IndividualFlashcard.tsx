import { fetchFlashcards } from "@/app/lib/data"
import DOMPurify from "isomorphic-dompurify";

export default async function IndividualFlashcard({flashcardData}: {flashcardData: any}) {

    
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