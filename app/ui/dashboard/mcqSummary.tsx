"use client"

import React from 'react';
import { ResponseAssessmentContext } from './flashcards';
import { useContext } from "react";
import { assessedResponse, FlashcardData } from '@/app/lib/definitions';
import ChecklistFeedback from './checklistFeedback';
import DOMPurify from "isomorphic-dompurify";
import McqMarkScheme from './mcqMarkScheme';
import NextFlashcardMenu from './nextFlashcardMenu';
import Link from 'next/link';
import { topic } from '@/app/lib/definitions';
/*
This is the updated draft, which was developed in mcqSummaryMock
Note issues: flashcard.id is assigned as a string in the FlashcardData type, but a number in the database,
strangely, that hadn't created issues until this component. The FlashcardData type should be updated,
which may generate many errors, but it has to be done
*/

const McqSummaryMock = (
    {
        summary,
        allFlashcardsData,
        wrongFirstTime,
        repeatSet,
        referredViaIndividual,
        topics,
        examboards
    }: 
    {
        summary: string,
        allFlashcardsData: FlashcardData[],
        wrongFirstTime: number[],
        repeatSet: () => void,
        referredViaIndividual: boolean,
        topics: topic,
        examboards: string[]
    }
) => {

    /*
    function that takes all the flashcard data and split it between wrongFirstTime and a new
    array, rightFirstTime
    
    */

    console.log('mcqSummaryTriggering')

    const rightFirstTime = allFlashcardsData.filter((x) => {
        return !wrongFirstTime.includes(x.id)
    })

    const mappedForId = rightFirstTime.map((x) => x.id)

    console.log('wrongFirstTime')
    console.log(wrongFirstTime)
    console.log('rightFirstTime')
    console.log(mappedForId)
    const one = 1;
const flashcardWithIdOne = allFlashcardsData.filter((x) => {return x.id === 1})

console.log(flashcardWithIdOne[0])

allFlashcardsData.map((x) => {
  console.log(x.id);
})

    const questionExtractor = (indexAsNumber: number) => {
      console.log(indexAsNumber);
      const extractedQuestionData = allFlashcardsData.filter((x) => {
        return x.id === indexAsNumber;
      })
      console.log(extractedQuestionData[0])
      return extractedQuestionData[0];
    }
    
    //const responseAssessment = useContext(ResponseAssessmentContext);

    let key = 1;

    return (
        <div className="w-full lg:w-4/5 m-auto py-2 lg:mt-10">
          <div className="flex justify-center">
            <h1>Feedback</h1>
          </div>
            <div className="bg-elephant-violet text-white w-full flex flex-col border-2 border-black rounded-lg mt-5 p-5 py-10">
              <p
                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(summary)}}
                className="text-base"
              ></p>
              <p className="text-base">Scroll down to see which flashcards you got right first time and which you got wrong at least once. Correct answer is shown in colour. Or skip straight to checking out more <Link href="#next-flashcard-menu">flashcards</Link>.</p>
            </div>
            <div className="flex flex-col items-center mt-5">
              <span style={{fontSize: "50px"}}>&#129395;</span>
              <h2>Right first time  </h2>
            </div>
            
              
              {
                rightFirstTime.map((x) => (
                  <div key={x.id}>
                  <McqMarkScheme
                    question={x.question}
                    multipleChoiceResponses={x.multiple_choice_responses}
                    correctAnswer={x.correct_answer}
                    keyNumber={Number(x.id)}
                  >                    
                  </McqMarkScheme>
                  </div>

                ))

              }


            

            <div className="flex flex-col items-center mt-5">
              <span style={{fontSize: "50px"}}>&#128556;</span>
              <h2>Wrong at least once </h2>
            </div>
            
              
                {wrongFirstTime.map((x) => (
                  <div key={x}>
                  <McqMarkScheme
                    question={questionExtractor(x).question}
                    multipleChoiceResponses={questionExtractor(x).multiple_choice_responses}
                    correctAnswer={questionExtractor(x).correct_answer}
                    keyNumber={Number(x)}
                  >                    
                  </McqMarkScheme>
                  </div>
                ))}

                <NextFlashcardMenu 
                  repeatSet={repeatSet}
                  referredViaIndividual={referredViaIndividual}
                  topics={topics}
                  examboards={examboards}
                />
            
        </div>
    )
}

export default McqSummaryMock;