/*
This component:

renders the correct answer top of the list, in one of the four colours (see keyNumber note below)
render the incorrect answers all in the same grey

It receives the flashcard data for a given question. It renders the question, all the possible responses,
and the correct response

To do:

Make resizing of the text possible with the slider

Manual:

keyNumber NOTE

Individual items produced by mapping any array all need a unique key. It makes sense to use the id
number of the flashcard for that, since they will all definitely be unique. Meanwhile, the remainder
produced by dividing any id number by 4 will be 0,1,2 or 3. This remainder is then used conditionally
to render the correct answer of each question a different colour than the directly previous and 
subsequent correct answers. 
Note that passing the prop as key doesn't work, because key is a protected term for assigning key
numbers for mapped array items. So it's important that the prop name is not key, hence keyNumber

export type FlashcardData = {
  id: string;
  definition: string;
  question: string;
  name: string;
  multiple_choice_responses: MCQData;
  correct_answer: string;
  checklist: string[];
  examboards: string[];
  topic: topic;
};

*/

import React, { useEffect, useState, useRef } from 'react';
import { FlashcardData, MCQData, HTMLElementEvent, customMouseEventHandler } from '@/app/lib/definitions';
import DOMPurify from "isomorphic-dompurify";
import { shuffle } from '@/app/lib/functions';
import clsx from 'clsx';
import {Space_Mono, Inconsolata} from "next/font/google";

const inconsolata = Inconsolata({
    subsets: ['latin'],
    weight: "300",    
  })

export default function McqMarkScheme(
  {
    question,
    multipleChoiceResponses,
    correctAnswer,
    keyNumber
  }:{
    question: string,
    multipleChoiceResponses: MCQData,
    correctAnswer: string,
    keyNumber: number,
  }
){

  const [resizeableFontValue, setResizeableFontValue] = useState(48)

  useEffect(() => {
    setResizeableFontValue(48);
  }, [question]);
  

  const lettersOfResponses = ["A", "B", "C", "D"]
    return (
        <>
        <div
          
          className={`${inconsolata.className} my-auto mt-5 px-5 py-1 text-center w-full overflow-hidden h-full`}          
          style={{fontSize: `${resizeableFontValue}px`}}
        >
          <h3
            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question)}}
          ></h3>
        </div>
        <div className="grid md:grid-cols-2 gap-0 mt-5">
        {
            <div 
              className={clsx("border-2 flex min-h-[15vh] flex-col items-end border-black rounded-lg px-5 py-1",
               {
                 'bg-elephant-bright-orange': keyNumber % 4 === 0,
                 'bg-elephant-red': keyNumber % 4 === 1,
                 'bg-elephant-orange': keyNumber % 4 === 2,
                 'bg-elephant-pink': keyNumber % 4 === 3
              }
              )}
              dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(multipleChoiceResponses[correctAnswer as keyof MCQData])}}
            >
            </div>
        }
        {
            lettersOfResponses.filter((x) => x !== correctAnswer).map((x) => (                    
                    <>
                      <div className={clsx('border-2 flex min-h-[15vh] flex-col items-end border-black rounded-lg px-5 py-1',
                        {
                            'variable-background': x === correctAnswer,
                            'bg-gray-300': x !== correctAnswer
                        }
                     )}
                      >
                        <div
                          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(multipleChoiceResponses[x as keyof MCQData])}}
                          className={`${inconsolata.className} my-auto box-border px-1 py-1 w-full overflow-y-hidden h-full`}                          
                          style={{fontSize: `16px`}}
                        >
                        </div>                        
                      </div>
                    </>
                
            ))
        }
        </div>
        </>
    )
}