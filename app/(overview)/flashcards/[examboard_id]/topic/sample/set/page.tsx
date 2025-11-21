import { fetchComplementaryTopic } from "@/app/lib/data";
import FlashcardPresentation from "@/app/ui/dashboard/flashcards";
import { auth } from "@/auth";
import { fakeSession } from "@/app/upgradeFiles/miscObjectsAndFunctions";

export default async function Page({ params }: { params: Promise<{ examboard_id: string }>}) {    

    const { examboard_id } = await params;
    const allFlashcardsData = await fetchComplementaryTopic(examboard_id)
    
    //const session: any = await auth();
    const session = fakeSession;
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