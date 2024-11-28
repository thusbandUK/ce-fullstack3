import React from 'react';
import { FlashcardData, MCQData, HTMLElementEvent, customMouseEventHandler } from '@/app/lib/definitions';
import DOMPurify from "isomorphic-dompurify";
import { shuffle } from '@/app/lib/functions';
import clsx from 'clsx';

export default function MultipleChoiceQuestion(
    {oneFlashcardData, handleQuestionClick,}: 
    {oneFlashcardData: FlashcardData; handleQuestionClick: React.MouseEventHandler<HTMLDivElement>}
) {

    const {multiple_choice_responses: multipleChoiceResponses, question} = oneFlashcardData;

    const shuffledDeck = shuffle(Object.keys(multipleChoiceResponses as MCQData));

    return (
        <div>           
            
                    <h2>{question}</h2>
                    <div className="grid md:grid-cols-2 gap-0">
                    
                   {shuffledDeck.map((MCQ: string) => (
                     <div onClick={handleQuestionClick} key={MCQ} id={MCQ} style={{cursor:'pointer'}} className={clsx('border-2 border-black rounded-lg p-5',
                        {
                            'bg-red-400': shuffledDeck.indexOf(MCQ) === 0,
                            'bg-yellow-400': shuffledDeck.indexOf(MCQ) === 1,
                            'bg-lime-500': shuffledDeck.indexOf(MCQ) === 2,
                            'bg-blue-600': shuffledDeck.indexOf(MCQ) === 3
                        }
                     )}>
                        {/** <p>{shuffledDeck.indexOf(MCQ)}</p>       */}                  
                        <p
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(multipleChoiceResponses[MCQ as keyof MCQData])}}
                        ></p>
                    </div>
                    ))}
                
            </div>

        </div>
    )
}