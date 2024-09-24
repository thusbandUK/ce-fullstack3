import { fetchRandomSetOfFlashcards } from "@/app/lib/data";
import FlashcardPresentation from "@/app/ui/dashboard/flashcards";

export default async function Page({ params }: { params: { examboard_id: string } }) {    

    const allFlashcardsData = await fetchRandomSetOfFlashcards(params.examboard_id) 

return (
    <div>
        {allFlashcardsData.length === 0 ?
        null:
        <FlashcardPresentation
          allFlashcardsData={allFlashcardsData}
        />
        }
    </div>
)
}