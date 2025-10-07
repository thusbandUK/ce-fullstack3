import FlashcardPresentation from "@/app/ui/dashboard/flashcards";
import { fetchIndividualFlashcardByCode } from "@/app/lib/data";

    export default async function Page({ params }: { params: { topic_id: string, examboard_id: string, flashcard_code: string } }) {    

    const allFlashcardsData = await fetchIndividualFlashcardByCode(params.flashcard_code);
  
return (    
    <div className="h-82-vh">
        {allFlashcardsData.length === 0 ?
        null:
        <FlashcardPresentation
          allFlashcardsData={allFlashcardsData}
        />
        }       
    </div> 
)

}