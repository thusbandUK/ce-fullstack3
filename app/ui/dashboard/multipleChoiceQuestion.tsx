import React from 'react';
import { FlashcardData, MCQData, HTMLElementEvent, customMouseEventHandler } from '@/app/lib/definitions';

export default function MultipleChoiceQuestion(
    {questionBundle, handleQuestionClick,}: 
    {questionBundle: FlashcardData; handleQuestionClick: React.MouseEventHandler<HTMLDivElement>}
) {

    const {name, multiple_choice_responses: multipleChoiceResponses, question} = questionBundle;

    return (
        <div>           
            <div>                
                    <h2>{question}</h2>
                    
                   {Object.keys(multipleChoiceResponses as MCQData).map((MCQ: string) => (
                     <div onClick={handleQuestionClick} key={MCQ} id={MCQ} style={{cursor:'pointer'}}>
                        <p>{MCQ}</p>                        
                        <p>{multipleChoiceResponses[MCQ as keyof MCQData]}</p>
                    </div>
                    ))}
                
            </div>

        </div>
    )
}