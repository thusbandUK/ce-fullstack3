import { fetchFlashcardsByTopic } from "@/app/lib/data";
import FlashcardPresentation from "@/app/ui/dashboard/flashcards";

export default async function Page({ params }: { params: { topic_id: string } }) {    

    const allFlashcardsData = await fetchFlashcardsByTopic(params.topic_id);    

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