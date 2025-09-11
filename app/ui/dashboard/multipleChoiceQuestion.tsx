import React, { useEffect, useState, useRef } from 'react';
import { FlashcardData, MCQData, pRefsType } from '@/app/lib/definitions';
import { shuffle } from '@/app/lib/functions';
import clsx from 'clsx';
import {Inconsolata} from "next/font/google";
import Question from './question';
import Answers from './answers';

const inconsolata = Inconsolata({
    subsets: ['latin'],
    weight: "300",
  })

export default function MultipleChoiceQuestion(
    {oneFlashcardData, handleQuestionClick,multipleChoiceResponse}: 
    {oneFlashcardData: FlashcardData; handleQuestionClick: React.MouseEventHandler<HTMLDivElement>; multipleChoiceResponse: string}
) {

    const {multiple_choice_responses: multipleChoiceResponses, question} = oneFlashcardData;
    const [randomisedQuestionSet, setRandomisedQuestionSet] = useState<string[]>([]);    
    const [responseTextSize, setResponseTextSize] = useState<number>(48);

    //this is the ref used to compare scroll height and client height for the question
    const divRef = useRef<HTMLDivElement>(null);

    //these are the refs, the one for whichever response happens to be longest is used to compare the 
    //scroll height and the client height so that the text can be resized to fit
    
    const pRefs: pRefsType = {
        A: useRef<HTMLDivElement>(null),
        B: useRef<HTMLDivElement>(null),
        C: useRef<HTMLDivElement>(null),
        D: useRef<HTMLDivElement>(null)
    }

    //this resets the text size back to a maximum value from which to downsize whenever a new question
    //is rendered
    useEffect(() => {
      setResponseTextSize(48);
    }, [question]);    

    //function for stripping html tags from the incoming responses. Otherwise the tags affect the
    //character length and the logic resizes the font for the response that doesn't appear the longest
    //on screen
    function stripHtmlTags(input: string): string {
      return input.replace(/<\/?[^>]+(>|$)/g, '');
    }

    /*On *first* render for each question the below sets the randomisedQuestionSet to a shuffled sequence
    of A, B, C, D. This is necessary because the component rerenders when answers are selected (since parent
    component state changes) and without it, the buttons switch places while the feedback is displayed
    */
    useEffect(() => {
        const shuffledDeck: string[] = shuffle(Object.keys(multipleChoiceResponses as MCQData));
        setRandomisedQuestionSet(shuffledDeck);        
        return
    }, [oneFlashcardData, multipleChoiceResponses])
    
    //iterates through all the multiple choice responses and returns the 
    //letter (ie which response) of the one that features the longest on screen text (not including tags)
    const returnHighestCharacters = () => {
        
        let highest = {
            number: 0,
            response: ''
        }
        
        Object.entries(multipleChoiceResponses).forEach(([key, value]) => {            
            const lengthNoTags = stripHtmlTags(value).length;
            if (lengthNoTags > highest.number){
                return highest = {number: lengthNoTags, response: key}
            }
          });                
          
        return highest.response;
    }    
    
    return (
        <div className="w-full h-full flex flex-col justify-between px-2 pb-4">
                    <div className="h-13-vh md:h-25-vh flex">
                      <div
                        ref={divRef}                      
                      >
                        <Question
                          question={question}
                          divRef={divRef}
                          multipleChoiceResponse={multipleChoiceResponse}
                        ></Question>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-0 w-full h-68-vh md:h-56-vh">
                    
                   {randomisedQuestionSet.map((MCQ: string) => (
                     <div ref={pRefs[MCQ as keyof MCQData]} onClick={handleQuestionClick} tabIndex={0} role="button" key={MCQ} id={MCQ} style={{cursor:'pointer'}} className={clsx('border-2 h-17-vh md:h-28-vh flex border-black rounded-lg px-5 py-1',
                        {
                            'bg-elephant-bright-orange': randomisedQuestionSet.indexOf(MCQ) === 0,
                            'bg-elephant-red': randomisedQuestionSet.indexOf(MCQ) === 1,
                            'bg-elephant-orange': randomisedQuestionSet.indexOf(MCQ) === 2,
                            'bg-elephant-pink': randomisedQuestionSet.indexOf(MCQ) === 3
                        }
                     )}>                      
                      <Answers
                        response={multipleChoiceResponses[MCQ as keyof MCQData]}
                        highest={returnHighestCharacters() === MCQ ? true : false }
                        multipleChoiceResponse={multipleChoiceResponse}
                        pRef={pRefs[MCQ as keyof MCQData]}
                        responseTextSize={responseTextSize}
                        editResponseTextSize={setResponseTextSize}
                      >
                      </Answers>
                    </div>
                    ))}
            </div>
        </div>
    )
}

/*
removed from response p element
style={{fontSize: `calc(0.10rem * ${textScaler()})`}}
*/