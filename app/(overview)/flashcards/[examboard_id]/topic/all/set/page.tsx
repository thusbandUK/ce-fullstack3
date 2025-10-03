import { fetchRandomSetOfFlashcards } from "@/app/lib/data";
import FlashcardPresentation from "@/app/ui/dashboard/flashcards";
import { CardSkeleton } from "@/app/ui/dashboard/skeletons"; 
import { Suspense } from 'react';

export default async function Page({ params }: { params: { examboard_id: string } }) {    

    const allFlashcardsData = await fetchRandomSetOfFlashcards(params.examboard_id) 
//
//style={{height: '84vh'}}
return (
    <div className="h-82-vh">
        {allFlashcardsData.length === 0 ?
        null:
        <Suspense fallback={<CardSkeleton />}>
        <FlashcardPresentation
          allFlashcardsData={allFlashcardsData}
        />
        </Suspense>
        }
    </div>
)
}

// className="w-11/12 md:w-4/5 mx-auto mt-10"