import React from 'react';
import { ResponseAssessmentContext } from './flashcards';
import { useContext } from "react";
import { assessedResponse, FlashcardData } from '@/app/lib/definitions';
import ChecklistFeedback from './checklistFeedback';
import DOMPurify from "isomorphic-dompurify";
import McqMarkScheme from './mcqMarkScheme';

/*
This is the first draft, which will be replaced by the contents of mcqSummaryMock
Note issues: McqMarkScheme is missing keyNumber prop data, which will be corrected in mcqSummaryMock
*/

const McqSummary = (
    {
        summary,
        allFlashcardsData,
        wrongFirstTime
    }: 
    {
        summary: string,
        allFlashcardsData: FlashcardData[],
        wrongFirstTime: string[]
    }
) => {

    /*
    function that takes all the flashcard data and split it between wrongFirstTime and a new
    array, rightFirstTime
    
    */

    const rightFirstTime = allFlashcardsData.filter((x) => {
        return !wrongFirstTime.includes(x.id)
    })

    const mappedForId = rightFirstTime.map((x) => x.id)

    //console.log('wrongFirstTime')
    //console.log(wrongFirstTime)
    //console.log('rightFirstTime')
    //console.log(mappedForId)

    const questionExtractor = (indexAsString: string) => {
      const extractedQuestionData = allFlashcardsData.filter((x) => {
        return x.id === indexAsString;
      })
      return extractedQuestionData[0];
    }
    
    //const responseAssessment = useContext(ResponseAssessmentContext);

    return (
        <div className="w-full lg:w-4/5 m-auto py-2 lg:mt-10">
            <div className="w-full flex border-2 border-black rounded-lg p-5 py-10">
              <p
                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(summary)}}
                className="text-base"
              ></p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
              <h2>You got these right first time</h2>
              {
                rightFirstTime.map((x) => (
                  <McqMarkScheme
                    question={x.question}
                    multipleChoiceResponses={x.multiple_choice_responses}
                    correctAnswer={x.correct_answer}
                  >                    
                  </McqMarkScheme>

                ))

              }

            </div>
            

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
              <h2>You got these wrong at least once</h2>
                {wrongFirstTime.map((x) => (
                  <McqMarkScheme
                    question={questionExtractor(x).question}
                    multipleChoiceResponses={questionExtractor(x).multiple_choice_responses}
                    correctAnswer={questionExtractor(x).correct_answer}
                  >                    
                  </McqMarkScheme>
                ))}
            </div>
        </div>
    )
}

export default McqSummary;