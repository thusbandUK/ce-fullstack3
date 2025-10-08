import FlashcardPresentation from "@/app/ui/dashboard/flashcards";
import { fetchIndividualFlashcardByCode } from "@/app/lib/data";

    export default async function Page({ params }: { params: { flashcard_code: string } }) {    

    const allFlashcardsData = await fetchIndividualFlashcardByCode(params.flashcard_code);

    /*
    So, I would like this to go straight into the multiple choice question, one option for which
    would be to introduce a forceMCQ prop to the FlashcardPresentation component, combined with useEffect,
    another of which would be to make a FlashcardPresentationMCQOnly component, which would make use
    of lots of imported functions

    well, looks like that worked pretty well. That now automatically loads the MCQ qu, now you need to
    think about follow up. Try the rest of this topic, try other topics. Also, if you render all of the
    questions that have been completed, showing the correct answer.

    Also, when you're using this with your students and they get the wrong one, it would be nice if there
    was a back button so they could complete the same question again.
    */


  
return (    
    <div className="h-82-vh">
        {allFlashcardsData.length === 0 ?
        null:
        <FlashcardPresentation
          allFlashcardsData={allFlashcardsData}
          forceMCQ={true}
        />
        }       
    </div> 
)

}