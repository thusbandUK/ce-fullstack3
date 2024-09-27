import React from 'react';
import { FlashcardData, MCQData, HTMLElementEvent, customMouseEventHandler } from '@/app/lib/definitions';
import DOMPurify from "isomorphic-dompurify";
import { shuffle } from '@/app/lib/functions';

export default function MultipleChoiceQuestion(
    {oneFlashcardData, handleQuestionClick,}: 
    {oneFlashcardData: FlashcardData; handleQuestionClick: React.MouseEventHandler<HTMLDivElement>}
) {

    const {multiple_choice_responses: multipleChoiceResponses, question} = oneFlashcardData;

    return (
        <div>           
            <div>                
                    <h2>{question}</h2>
                    
                   {shuffle(Object.keys(multipleChoiceResponses as MCQData)).map((MCQ: string) => (
                     <div onClick={handleQuestionClick} key={MCQ} id={MCQ} style={{cursor:'pointer'}}>
                        <p>{MCQ}</p>                        
                        <p
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(multipleChoiceResponses[MCQ as keyof MCQData])}}
                        ></p>
                    </div>
                    ))}
                
            </div>

        </div>
    )
}