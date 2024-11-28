import { fetchRandomSetOfFlashcards } from "@/app/lib/data";
import FlashcardPresentation from "@/app/ui/dashboard/flashcards";
import { CardSkeleton } from "@/app/ui/dashboard/skeletons"; 
import { Suspense } from 'react';

export default async function Page({ params }: { params: { examboard_id: string } }) {    

    const allFlashcardsData = await fetchRandomSetOfFlashcards(params.examboard_id) 

return (
    <div>
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