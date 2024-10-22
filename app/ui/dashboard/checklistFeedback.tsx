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
            return uncheckedAnswers.push(x);
          }
    });

    return (
        <div>
            <p>Checked points</p>
              {checkedAnswers.map((y, i) => {
                return <p
                         key={i}
                         dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(y)}}
                       ></p>
                })
              }
            <p>Unchecked points</p>
              {uncheckedAnswers.map((z, j) => {
                return <p
                         key={j}
                         dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(z)}}                
                       ></p>
                })
              }

        </div>
    )

}

export default ChecklistFeedback;