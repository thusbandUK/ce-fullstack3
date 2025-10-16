import { fetchComplementaryTopic } from "@/app/lib/data";
import FlashcardPresentation from "@/app/ui/dashboard/flashcards";
import { auth } from "@/auth";

export default async function Page({ params }: { params: { examboard_id: string } }) {    

    const allFlashcardsData = await fetchComplementaryTopic(params.examboard_id)
    
    const session: any = await auth();
//w-11/12 md:w-4/5 mx-auto mt-10
return (
    <div className="">
        {allFlashcardsData.length === 0 ?
        null:
        <FlashcardPresentation
          allFlashcardsData={allFlashcardsData}
          forceMCQ={false}
          loggedIn={ session ? true : false }
        />
        }
    </div>
)
}