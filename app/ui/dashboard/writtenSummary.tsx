import React from 'react';
import { ResponseAssessmentContext } from './flashcards';
import { useContext } from "react";
import { assessedResponse, FlashcardData } from '@/app/lib/definitions';
import ChecklistFeedback from './checklistFeedback';
import DOMPurify from "isomorphic-dompurify";
import NextFlashcardMenu from './nextFlashcardMenu';
import { topic } from '@/app/lib/definitions';

const WrittenSummary = (
    {
        summary,
        allFlashcardsData,
        repeatSet,
        referredViaIndividual,
        topics,
        examboards,
        loggedIn,
    }: 
    {
        summary: string,
        allFlashcardsData: FlashcardData[],
        repeatSet: () => void,
        referredViaIndividual: boolean,
        topics: topic,
        examboards: string[],
        loggedIn: boolean        
    }
) => {
    
    const responseAssessment = useContext(ResponseAssessmentContext);

    return (
        <div className="w-full lg:w-4/5 m-auto py-2 lg:mt-10">
            <div className="w-full flex border-2 border-black rounded-lg p-5 py-10">
              <p
                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(summary)}}
                className="text-base"
              ></p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
            {responseAssessment.map((x: assessedResponse, i) => {

                return (
                    <div
                      key={i}
                      className="border-2 border-black rounded-lg p-5 variable-background"
                    >
                      <h2 
                        className="text-2xl"
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(allFlashcardsData[x.flashcardDataIndex].question)}}
                      ></h2>
                      
                      <div className="p-1 mt-4">
                        { x.response ?
                            <p
                              className="text-lg italic"
                            >
                              &quot;{x.response}&quot;
                            </p>
                          : null
                        }
                        
                      </div>
                      <ChecklistFeedback
                        responseAssessment={x}
                        allFlashcardsData={allFlashcardsData}                      
                      />                      
                    </div>
                )
            })}
            </div>
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

export default WrittenSummary;