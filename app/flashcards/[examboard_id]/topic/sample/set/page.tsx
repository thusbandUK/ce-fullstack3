import { fetchComplementaryTopic } from "@/app/lib/data";
import FlashcardPresentation from "@/app/ui/dashboard/flashcards";

export default async function Page({ params }: { params: { examboard_id: string } }) {    

    const allFlashcardsData = await fetchComplementaryTopic(params.examboard_id) 

return (
    <div className="w-11/12 md:w-4/5 mx-auto mt-10">
        {allFlashcardsData.length === 0 ?
        null:
        <FlashcardPresentation
          allFlashcardsData={allFlashcardsData}
        />
        }
    </div>
)
}