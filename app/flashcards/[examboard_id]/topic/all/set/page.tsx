import { fetchFlashcardsByTopic, fetchRandomSetOfFlashcards } from "@/app/lib/data";
import { FlashcardData } from "@/app/lib/definitions";

export default async function Page({ params }: { params: { examboard_id: string } }) {    

    const allFlashcardsData = await fetchRandomSetOfFlashcards(params.examboard_id) 

return (
    <div>
        <p>A random selection of flashcards</p>
        <div>{allFlashcardsData.map((x: any) => (
            <p key={x.id}
            >{x.question}</p>
        ))}</div>
    </div>
)


}