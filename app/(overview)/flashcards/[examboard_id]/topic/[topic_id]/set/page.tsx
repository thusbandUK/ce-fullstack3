import { fetchFlashcardsByTopic } from "@/app/lib/data";
import FlashcardPresentation from "@/app/ui/dashboard/flashcards";
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { headers } from "next/headers";

export default async function Page({ params }: { params: Promise<{ topic_id: string, examboard_id: string }> }) {    

  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })

  const { topic_id, examboard_id } = await params;
    
    if (!session) {
      //if user is not signed in they are redirected to login, with a query of the current url
      //to which they are returned upon completion of sign in
      redirect(`/account/login?location=/flashcards/${examboard_id}/topic/${topic_id}/set`);      
    }

    const allFlashcardsData = await fetchFlashcardsByTopic(topic_id);
    if (!allFlashcardsData){
      redirect(`/flashcards/${examboard_id}/topic`);
    }
//w-11/12 md:w-4/5 mx-auto mt-10
return (
    <div className="h-82-vh">
        {allFlashcardsData.length === 0 ?
        null:
        <FlashcardPresentation
          allFlashcardsData={allFlashcardsData}
          forceMCQ={false}
          loggedIn={ session ? true : false}
        />
        }       
    </div>
)

}