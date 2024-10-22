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

    return (
        <div>
            <p>{summary}</p>
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