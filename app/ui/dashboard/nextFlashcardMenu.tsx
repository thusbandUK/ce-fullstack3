"use client"

import { useParams } from 'next/navigation';
import { topic } from "@/app/lib/definitions";
import MenuItem from "./menuItem";
import MenuItemButton from "./menuItemButton";
import MenuItemRedirect from "./menuItemRedirect";
import { fetchFlashcardsByTopicDescriptor } from "@/app/lib/data";
import { useState } from "react";
import { fetchTopicsByExamboardTitle } from "@/app/lib/data";
import Modal from "./modal";

/*
This module renders a menu of options for users who have just completed a set of flashcards

The component is passed:

        repeatSet - a function that resets state in FlashcardPresentation so question set can be repeated
        referredViaIndividual - did the user do a single flashcard, using social media link
        topics - the topic(s) associated with the question (set)(an object of form {[examboard]: [topic title]})
        examboards - the examboards associated with the question (set)(array of form ["examboard1", ...])
        loggedIn - a boolean passed down from the routes which call FlashcardsPresentation, true if logged in




Options

If they were referred from an individual flashcard, their options are:

1) do the other questions in the set for any examboards which feature that question
    (calls fetchFlashcardsByTopicDescriptor, passing the title of the topic to the function, which
        redirects the user to that topic, via a modal warning them they will need to sign up for
        non-complementary topics
    )
2) choose other topics from any available examboards
    (calls fetchTopicsByExamboardTitle, similar to option 1, but just takes them to the available topics
        for that exam board
    )

If they appeared from any other route, it's all must more straight forward, their options are:

1) repeat the topic (just resets state in parent FlashcardsPresentation component and they start again)
2) choose other topics from the same examboard, the id for which is extracted via params

The database call functions are both passed the headings of the respective menus (menuItemRedirect),
in the case of fetch topics that's the topic and in the case of fetch examboards that's the examboard

*/

export default function NextFlashcardMenu(
    {
        repeatSet,
        referredViaIndividual,
        topics,
        examboards,
        loggedIn
    }:
    {
        repeatSet: () => void,
        referredViaIndividual: boolean,
        topics: topic,
        examboards: string[],
        loggedIn: boolean
    }
){

    const [ error, setError] = useState<string>("");
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const [ callback, setCallback ] = useState<string>("")

    const params = useParams<{examboard_id: string}>()

    const findTopic = async (topic: string) => {
        try {            
            const response = await fetchFlashcardsByTopicDescriptor(topic, loggedIn)
            if (response){
              if (response.message){
                setError(response.message);
              } else if (response.callback){
                setShowModal(true);                
                setCallback(response.callback)
              }
            }
            return
        } catch (error) {
            if (error instanceof Error){                
                return setError(error.message)
            }
            return setError("Something went wrong!")
        }
    }

    const findExamboard = async (examboard: string) => {
        try {
            const response = await fetchTopicsByExamboardTitle(examboard)
            if (response){
              if (response.message){
                setError(response.message);
              }
            }
            return
        } catch (error) {
            if (error instanceof Error){                
                return setError(error.message)
            }
            return setError("Something went wrong!")
        }
    }

    const modalContent = {
        heading: "Sign in!",
        content: "You must be signed in to access this content",
        link: {
            url: callback,
            text: "Sign in or sign up"
        }
    }

    return (
        <div id="next-flashcard-menu" className="mt-8">
            <h2>Try more flashcards</h2>
            { error ? <p>Yikes, you got an error. {error}</p> : null}
            <div  className="grid md:grid-cols-2 gap-0 mt-5">
            {
                referredViaIndividual ?
                
                <>
                {examboards.map((x) => (
                    <MenuItemRedirect
                      heading={`${topics[x as keyof topic]}`}
                      content={`Other flashcards from ${x} topic: ${topics[x as keyof topic]}`}
                      arrowCommand={'SELECT'}
                      dbCall={findTopic}
                    >                    
                    </MenuItemRedirect>
                ))}
                
                {examboards.map((x) => (
                    <MenuItemRedirect
                      heading={x}
                      content={`All available topics from ${x}`}
                      arrowCommand={'SELECT'}
                      dbCall={findExamboard}                      
                    >                    
                    </MenuItemRedirect>
                ))}
                </>
                :
                <>
                  <MenuItemButton 
                    heading={"Repeat"}
                    content={"Click to repeat the same set. If you did the multiple choice questions, you could try writing your answers this time."}
                    signalClick={repeatSet}
                    arrowCommand={"SELECT"}
                  />
                  <div className="border-2 border-black rounded-lg p-5">
                  <MenuItem
                    heading={"New topic"}
                    content={"Choose a different topic"}
                    link={`/flashcards/${params.examboard_id}/topic`}
                    modalContent={null}
                    logInterest={null}
                    identifier={null}
                    arrowCommand={"SELECT"}                  
                  />
                  </div>
                </>

            }
            </div>
            <label htmlFor={`my_modal_${34}`} className="cursor-pointer"></label>
            <Modal 
              modalContent={modalContent}
              identifier={34}
              remoteCheck={true}
              isChecked={showModal}
              toggleModal={() => setShowModal(!showModal)}
            />
        </div>
    )
}