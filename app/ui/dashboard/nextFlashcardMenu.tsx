"use client"

import Link from "next/link";
import { useParams } from 'next/navigation'
import { topic } from "@/app/lib/definitions";
//import MenuItemButton from "./menuItemButton";
import MenuItem from "./menuItem";
import MenuItemRedirect from "./menuItemRedirect";
import { fetchFlashcardsByTopicDescriptor } from "@/app/lib/data";
import { redirect } from "next/navigation";
import { useState } from "react";
/*
this will be passed topics / examboards / referredViaIndividual


referredViaIndividual OR JUST JUST FORCEMCQ BOOLEAN
topics / examboards
topics, examboards string | null

Okay, repeat set now just resets all of the state values in FlashcardPresentation and 
they loop through the whole thing again

Next: examboard, that value should be sent when Flashcard renders, infaaact, if it's a number, that
just goes straight into the link, if it's a string then that signals it came via individual, so the 
referredViaIndividual boolean is unnecessary, so individuals only returntopics / examboards, but can't
we just harvest that from params? (or is that not a use client t'ing)

if (referredViaIndividual){
    render 
    1) other questions from this topic via [EXAMBAORD]
    2) other questions from this topic via [OTHER EXAMBOARD]
    ...
} else {
    render
    repeat this same topic
    choose another topic from [EXAMBOARD BUT WE ALREADY KNOW WHICH, ONLY, DO WE?]
}


*/

//{ params }: { params: { examboard_id: string } }

export default function NextFlashcardMenu(
    {
        repeatSet,
        referredViaIndividual,
        topics,
        examboards
    }:
    {
        repeatSet: () => void,
        referredViaIndividual: boolean,
        topics: topic,
        examboards: string[]
    }
){

    const [ error, setError] = useState<string>("");

    const params = useParams<{examboard_id: string}>()
    console.log('params...')
    console.log(params)

    const findTopic = async ({topic}: {topic: string}) => {
        console.log('find topic called?')
        console.log(topic.replace(/^Topic:\s*/, ""))
        try {
            const response = await fetchFlashcardsByTopicDescriptor(topic.replace(/^Topic:\s*/, ""))
            if (response){
              if (response.message){
                setError(response.message);
              }
            }
            return
        } catch (error) {
            console.log('error log starts')
            //console.log(Object.entries(error));
            console.log('error log finshess')
            if (error instanceof Error){
                console.log('instance of error')
                return setError(error.message)
            }
            return setError("Something went wrong!")

        }
        
        
        console.log('hello!')
    }

    return (
        <div id="next-flashcard-menu" className="mt-3">
            <h2>Try more flashcards</h2>
            { error ? <p>Yikes, you got an error. {error}</p> : null}
            {
                referredViaIndividual ?
                <div>
                <h3>Do the rest of the topic</h3>
                {examboards.map((x) => (
                    <MenuItemRedirect
                      heading={x}                      
                      content={`Topic: ${topics[x as keyof topic]}`}                      
                      arrowCommand={'SELECT'}                      
                      dbCall={findTopic}
                    
                    >
                    
                    </MenuItemRedirect>

                   
                    

                ))}                
                </div>
                :
                <div>
                  <button onClick={repeatSet}>Click to repeat set</button>
                  <Link href={`/flashcards/${params.examboard_id}/topic`}>Choose another topic</Link>
                </div>

            }
            
        </div>
    )
}
/*
<div>
                        <p>Examboard: {x}</p>
                        <p>Topic: {topics[x as keyof topic]}</p>
                    </div>*/