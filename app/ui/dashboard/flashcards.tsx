import { fetchFlashcards } from "@/app/lib/data"

export default async function FlashcardPresentation() {

    const flashcardData = await fetchFlashcards();

    if (!flashcardData || flashcardData.length === 0) {        
        return <p className="mt-4 text-gray-400">No data available.</p>;
      }

    flashcardData.map((x: any) => {
        console.log(x.multiple_choice_responses);
        console.log(x.checklist);
    })

    
return (
    <div>
        {flashcardData.map((flashcard) => (
            <div key={flashcard.id} className="flex flex-col items-center gap-2">
              <p>{flashcard.question}</p>
              <p>{flashcard.definition}</p>
              {/*<p>{flashcard.multiple_choice_responses}</p>
              <p>{flashcard.checklist}</p>*/}
            </div>
          ))}
    </div>
)
}