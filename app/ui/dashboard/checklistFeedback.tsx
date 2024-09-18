import React from "react";
import { assessedResponse, FlashcardData } from "@/app/lib/definitions";
import { numericalIndexToLetter } from "./writtenFlashcard";

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

    let checkedAnswers: string[] = [];
    let uncheckedAnswers: string[] = [];

    //this maps the checklist of available responses for the flashcard passed via props, then 
    //checks the responseAssessment to see whether they've been checked by the user
    //dividing all the responses between the above two arrays, which are then mapped individually in the return
    //statement below
    masterChecklist.map((x: string) => {
        let checklistIndex: number = masterChecklist.findIndex((item) => item === x);
        let checklistKey: keyof assessedResponse["checkedPoints"] = numericalIndexToLetter(checklistIndex);
          if (responseAssessment.checkedPoints[checklistKey]){
            return checkedAnswers.push(x);
          } else {
            return uncheckedAnswers.push(x);
          }
    });

    return (
        <div>
            <p>Checked points</p>
              {checkedAnswers.map((y) => {
                return <p>{y}</p>
                })
              }
            <p>Unchecked points</p>
              {uncheckedAnswers.map((z) => {
                return <p>{z}</p>
                })
              }

        </div>
    )

}

export default ChecklistFeedback;