import { fetchFlashcardsByTopic } from "@/app/lib/data";
import FlashcardPresentation from "@/app/ui/dashboard/flashcards";
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function Page({ params }: { params: { topic_id: string, examboard_id: string } }) {    

  const session: any = await auth();
    
    if (!session) {
      //if user is not signed in they are redirected to login, with a query of the current url
      //to which they are returned upon completion of sign in
      redirect(`/login?location=/flashcards/${params.examboard_id}/topic/${params.topic_id}/set`);
      //`/login?location=/flashcards/${params.examboard_id}/topic/${params.topic_id}/set`
    }

    const allFlashcardsData = await fetchFlashcardsByTopic(params.topic_id);    
//w-11/12 md:w-4/5 mx-auto mt-10
return (
    <div className="h-82-vh">
        {allFlashcardsData.length === 0 ?
        null:
        <FlashcardPresentation
          allFlashcardsData={allFlashcardsData}
        />
        }       
    </div>
)

}