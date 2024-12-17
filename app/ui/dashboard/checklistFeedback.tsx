import React from "react";
import { assessedResponse, FlashcardData } from "@/app/lib/definitions";
import { numericalIndexToLetter } from "./writtenFlashcard";
import DOMPurify from "isomorphic-dompurify";

const ChecklistFeedback = (
    {
        responseAssessment,
        allFlashcardsData
    }: 
    {
        responseAssessment: assessedResponse,
        allFlashcardsData: FlashcardData[]
    }
) => {

    const masterChecklist = allFlashcardsData[responseAssessment.flashcardDataIndex].checklist;

    const checkedAnswers: string[] = [];
    
    const uncheckedAnswers: string[] = [];

    //this maps the checklist of available responses for the flashcard passed via props, then 
    //checks the responseAssessment to see whether they've been checked by the user
    //dividing all the responses between the above two arrays, which are then mapped individually in the return
    //statement below
    masterChecklist.map((x: string) => {
        const checklistIndex: number = masterChecklist.findIndex((item) => item === x);
        const checklistKey: keyof assessedResponse["checkedPoints"] = numericalIndexToLetter(checklistIndex);
          if (responseAssessment.checkedPoints[checklistKey]){
            return checkedAnswers.push(x);
          } else {
            return x ? uncheckedAnswers.push(x) : null;
            //if (x !== null){
              //return uncheckedAnswers.push(x);
            //} else {
             // return
            //}            
          }
    });

    return (
        <>
          <div className="mt-4">
            
              {checkedAnswers.map((y, i) => {
                return (
                        <div 
                          key={i}
                          className="flex"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="min-w-6 size-6">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                          </svg>
                          <p
                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(y)}}
                            className="text-base ms-1"
                          ></p>
                        </div>
                      )                       
                    })
                  }
          </div>
          <div className="mt-4">
            {uncheckedAnswers.map((z, j) => {
              return (
                      <div 
                        key={j}
                        className="flex"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="min-w-6 size-6">
                          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                        </svg>
                        <p
                          
                          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(z)}}
                          className="text-base ms-1"
                        ></p>
                      </div>)
                    })
                  }
          </div>
        </>
    )
}

export default ChecklistFeedback;