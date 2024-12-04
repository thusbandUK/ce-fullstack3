import React from 'react';
import { ResponseAssessmentContext } from './flashcards';
import { useContext } from "react";
import { assessedResponse, FlashcardData } from '@/app/lib/definitions';
import ChecklistFeedback from './checklistFeedback';
import DOMPurify from "isomorphic-dompurify";

const Response = (
    {
        summary,
        allFlashcardsData
    }: 
    {
        summary: string,
        allFlashcardsData: FlashcardData[]
    }
) => {
    
    const responseAssessment = useContext(ResponseAssessmentContext);
//<p>{summary}</p>
    return (
        <div className="bg-elephant-violet text-white absolute border-2 border-black rounded-lg p-5 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
            <p
            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(summary)}}
            ></p>
            {responseAssessment.map((x: assessedResponse, i) => {

                return (
                    <div
                      key={i}
                    >
                      <p>Question: </p>
                      <p
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(allFlashcardsData[x.flashcardDataIndex].question)}}
                      ></p>
                      <p>Response</p>
                      <p>{x.response}</p>
                      <ChecklistFeedback
                        responseAssessment={x}
                        allFlashcardsData={allFlashcardsData}                      
                      />                      
                    </div>
                )
            })}

        </div>
    )
}

export default Response;