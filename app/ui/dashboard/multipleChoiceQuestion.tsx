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
        <div className="w-100 h-100">           
            
                    <h4
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question)}}
                    ></h4>
                    <div className="grid md:grid-cols-2 gap-0">
                    
                   {shuffledDeck.map((MCQ: string) => (
                     <div onClick={handleQuestionClick} key={MCQ} id={MCQ} style={{cursor:'pointer'}} className={clsx('border-2 border-black rounded-lg p-5',
                        {
                            'bg-elephant-bright-orange': shuffledDeck.indexOf(MCQ) === 0,
                            'bg-elephant-red': shuffledDeck.indexOf(MCQ) === 1,
                            'bg-elephant-orange': shuffledDeck.indexOf(MCQ) === 2,
                            'bg-elephant-pink': shuffledDeck.indexOf(MCQ) === 3
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