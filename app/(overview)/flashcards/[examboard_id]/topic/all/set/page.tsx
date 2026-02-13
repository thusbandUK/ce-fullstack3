import { fetchRandomSetOfFlashcards } from "@/app/lib/data";
import FlashcardPresentation from "@/app/ui/dashboard/flashcards";
import { CardSkeleton } from "@/app/ui/dashboard/skeletons"; 
import { Suspense } from 'react';
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ examboard_id: string }>}) {    

    
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
      })    

    const { examboard_id } = await params;

    const allFlashcardsData = await fetchRandomSetOfFlashcards(examboard_id)
    
    if (!allFlashcardsData){
      redirect('/flashcards')
    }

return (
    <div>
        {allFlashcardsData.length === 0 ?
        null:
        <Suspense fallback={<CardSkeleton />}>
        <FlashcardPresentation
          allFlashcardsData={allFlashcardsData}
          forceMCQ={false}
          loggedIn={ session ? true : false}
        />
        </Suspense>
        }
    </div>
)
}