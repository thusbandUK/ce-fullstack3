"use client"

import React from 'react';
import { FlashcardData } from '@/app/lib/definitions';
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
        examboards,
        loggedIn
    }: 
    {
        summary: string,
        allFlashcardsData: FlashcardData[],
        wrongFirstTime: number[],
        repeatSet: () => void,
        referredViaIndividual: boolean,
        topics: topic,
        examboards: string[],
        loggedIn: boolean
    }
) => {

    /*
    function that takes all the flashcard data and split it between wrongFirstTime and a new
    array, rightFirstTime
    
    */    

    const rightFirstTime = allFlashcardsData.filter((x) => {
        return !wrongFirstTime.includes(x.id)
    })

    const feedbackMessage = () => {
      const scroll = `Scroll down to review your answer${referredViaIndividual ? "" : "s"}. Correct answer is shown in colour.`
      if (referredViaIndividual){
        
        if (rightFirstTime.length === 0){
          return `Wrong the first time but right in the end. This topic needs more work! ${summary} ${scroll}`
        } else if (wrongFirstTime.length === 0) {
          return `Right first time, great job! ${summary} ${scroll}`        
        } else {
          return `Not bad! ${summary} ${scroll}`
        }
      }
      
      if (rightFirstTime.length === 0){
        return `You got there in the end, but all answers were wrong the first time. This topic needs more work! ${summary} ${scroll}`
      } else if (wrongFirstTime.length === 0) {
        return `Every question right first time, great job! ${summary} ${scroll}`        
      } else {
        return `Not bad! ${summary} ${scroll}`
      }      
    }

    const questionExtractor = (indexAsNumber: number) => {      
      const extractedQuestionData = allFlashcardsData.filter((x) => {
        return x.id === indexAsNumber;
      })      
      return extractedQuestionData[0];
    }

    return (
        <div className="w-full lg:w-4/5 m-auto py-2 lg:mt-10">
          <div className="flex justify-center">
            <h1>Feedback</h1>
          </div>
            <div className="bg-elephant-violet text-white w-full flex flex-col border-2 border-black rounded-lg mt-5 p-5 py-10">
              <p
                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(feedbackMessage())}}
                className="text-base"
              ></p>
              <p className="text-base">Or skip straight to checking out more <Link href="#next-flashcard-menu" className="font-bold hover:underline active:text-black">flashcards</Link>.</p>
            </div>
            {
              rightFirstTime.length === 0 ?

              null

            :
            <>
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
                    referredViaIndividual={referredViaIndividual}
                  >                    
                  </McqMarkScheme>
                  </div>

                ))

              }

              </>
            }


            {
              wrongFirstTime.length === 0 ?

              null

            :

            <>
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
                referredViaIndividual={referredViaIndividual}
              >                    
              </McqMarkScheme>
              </div>
            ))}
            </>

            }
            

            
            
              
                

                <NextFlashcardMenu 
                  repeatSet={repeatSet}
                  referredViaIndividual={referredViaIndividual}
                  topics={topics}
                  examboards={examboards}
                  loggedIn={loggedIn}
                />
            
        </div>
    )
}

export default McqSummaryMock;