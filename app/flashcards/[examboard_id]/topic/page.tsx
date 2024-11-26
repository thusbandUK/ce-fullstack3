import { fetchTopics } from "@/app/lib/data";
import { TopicData } from "@/app/lib/definitions";
import Link from "next/link";
import MenuItem from "@/app/ui/dashboard/menuItem";
import { auth } from "@/auth";

export default async function Page({ params }: { params: { examboard_id: string } }) {
  
    const session: any = await auth();

    const topics = await fetchTopics(params.examboard_id);

    return (
      <div className='w-11/12 md:w-4/5 mx-auto mt-10'>
        <h1>Select your set of flashcards</h1>
        <div className="grid md:grid-cols-3 gap-0 mt-10">
          <div key={'random'} className="border-2 border-black rounded-lg p-5">
            <MenuItem
              heading={'Random'}
              content={'A random selection of 15 flashcards from the whole of A-level chemistry'}
              link={`/flashcards/${params.examboard_id}/topic/all/set`}
              modal={false}
              identifier={null}
              receiveEmail={null}
              logInterest={null}
              arrowCommand={'SELECT'}
            >
            </MenuItem>
          </div>
        {topics.map((x: TopicData) => (
          <div key={x.id} className="border-2 border-black rounded-lg p-5">
            <MenuItem
              heading={x.topic_code}
              content={x.topic_description}
              link={`/flashcards/${x.examboards_id}/topic/${x.id}/set`}
              modal={!session && topics.indexOf(x) >= 1 ? true : false}
              identifier={null}
              receiveEmail={null}
              logInterest={null}
              arrowCommand={!session && topics.indexOf(x) >= 1 ? 'ACCESS' : 'SELECT'}
            >
            </MenuItem>
            </div>
        ))}
        </div>
        
        
      </div>
    )
}

/*
<Link
                  href={`/flashcards/${x.examboards_id}/topic/${x.id}/set`}
                >
                    {x.topic_description}
                </Link>

<Link
          href={`/flashcards/${params.examboard_id}/topic/all/set`}
        >
          A random selection of 15 flashcards from the whole of A-level chemistry
        </Link>


<p>You must be signed in to view this content - <Link
          href={`/login?location=/flashcards/${params.examboard_id}/topic`}
        >log in now?</Link></p>
*/