import { fetchFlashcardsByTopic } from "@/app/lib/data";

export default async function Page({ params }: { params: { topic_id: string } }) {

    console.log(params.topic_id);

    const allFlashcardsData = await fetchFlashcardsByTopic(params.topic_id)

    console.log(allFlashcardsData);

return (
    <div>
        <p>Hello - I'm on the set page!</p>
    </div>
)


}