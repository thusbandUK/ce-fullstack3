import { fetchTopics } from "@/app/lib/data";
import { TopicData } from "@/app/lib/definitions";
import Link from "next/link";

export default async function Page({ params }: { params: { examboard_id: string } }) {    

    const topics = await fetchTopics(params.examboard_id);

    return (
      <div>
        <p>Select your set of flashcards</p>
        <Link
          href={`/flashcards/${params.examboard_id}/topic/all/set`}
        >
          A random selection of 15 flashcards from the whole of A-level chemistry
        </Link>
        {topics.map((x: TopicData) => (
            <div key={x.id}>
                <Link
                  href={`/flashcards/${x.examboards_id}/topic/${x.id}/set`}
                >
                    {x.topic}
                </Link>

            </div>
        ))}
        <p>You must be signed in to view this content - <Link
          href={`/login?location=/flashcards/${params.examboard_id}/topic`}
        >log in now?</Link></p>
        
      </div>
    )
}

