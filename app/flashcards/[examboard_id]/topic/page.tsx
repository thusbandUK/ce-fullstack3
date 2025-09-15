"use server"

import { fetchTopics } from "@/app/lib/data";
import { TopicData, ModalContent } from "@/app/lib/definitions";
import MenuItem from "@/app/ui/dashboard/menuItem";
import { auth } from "@/auth";
import { Suspense } from "react";
import { CardSkeleton, TopicsSkeleton } from "@/app/ui/dashboard/skeletons";
import DashboardSkeleton from "@/app/ui/dashboard/skeletons";


export default async function Page({ params }: { params: { examboard_id: string } }) {
  
    const session: any = await auth();

    const topics = await fetchTopics(params.examboard_id);

    const modalContent: ModalContent = 
    {
      heading: 'Sign in!',
      content: 'You must be signed in to access this content',
      link: {
        url: `/login?location=/flashcards/${params.examboard_id}/topic`,
        text: 'Sign in or sign up'
      }
    }
//className='w-11/12 md:w-4/5 mx-auto mt-10'
    return (
      <div className="w-full md:w-4/5 mx-auto mt-10 p-2">
        
        
        <h1>Select your set of flashcards</h1>
        <div className="grid md:grid-cols-3 gap-0 mt-10">
         
          <div key={'random'} className="border-2 border-black rounded-lg p-5">
          <Suspense key={'random'} fallback={<CardSkeleton />}>
            <MenuItem
              heading={'Random'}
              content={'A random selection of 15 flashcards from the whole of A-level chemistry'}
              link={`/flashcards/${params.examboard_id}/topic/all/set`}              
              modalContent={null}
              identifier={null}              
              logInterest={null}
              arrowCommand={'SELECT'}
            >
            </MenuItem>
            </Suspense>
          </div>
        {topics.map((x: TopicData) => (
          <div key={x.id} className="border-2 border-black rounded-lg p-5">
            <Suspense key={x.id} fallback={<CardSkeleton />}>
            <MenuItem
              heading={x.topic_code}
              content={x.topic_description}
              link={!session && x.complementary === true ? `/flashcards/${x.examboards_id}/topic/sample/set` : `/flashcards/${x.examboards_id}/topic/${x.id}/set`}
              modalContent={!session && topics.indexOf(x) >= 1 ? modalContent : null}
              identifier={x.id}              
              logInterest={null}
              arrowCommand={!session && topics.indexOf(x) >= 1 ? 'ACCESS' : 'SELECT'}
            >
            </MenuItem>
            </Suspense>
            </div>
        ))}
        </div>
        
      </div>
    )
}

/*
<Suspense key={'random'} fallback={<DashboardSkeleton />}></Suspense>
*/