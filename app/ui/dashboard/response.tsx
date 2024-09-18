import React from 'react';
import { ResponseAssessmentContext } from './flashcards';
import { useContext } from "react";
import { assessedResponse, FlashcardData } from '@/app/lib/definitions';
import ChecklistFeedback from './checklistFeedback';

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
            {responseAssessment.map((x: assessedResponse) => {

                return (
                    <div>
                      <p>Question: </p>
                      <p>{allFlashcardsData[x.flashcardDataIndex].question}</p>
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