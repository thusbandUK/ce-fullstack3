import { fetchFlashcardsByTopic } from "@/app/lib/data";
import { FlashcardData } from "@/app/lib/definitions";

export default async function Page({ params }: { params: { topic_id: string } }) {

    //console.log(params.topic_id);

    const allFlashcardsData = await fetchFlashcardsByTopic(params.topic_id)

    //console.log(allFlashcardsData);

return (
    <div>
        <p>Hello - I'm on the set page!</p>
        <div>{allFlashcardsData.map((x: FlashcardData) => (
            <p key={x.id}
            >{x.question}</p>
        ))}</div>
    </div>
)


}