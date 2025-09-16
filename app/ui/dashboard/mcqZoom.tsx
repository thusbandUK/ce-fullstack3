import React, { useEffect, useState } from 'react';
import { FlashcardData, MCQData } from '@/app/lib/definitions';
import { shuffle } from '@/app/lib/functions';
import clsx from 'clsx';
import {Inconsolata} from "next/font/google";
import DOMPurify from "isomorphic-dompurify";
import ArrowCommand from './arrowCommand';
import Slider from './slider';

const inconsolata = Inconsolata({
    subsets: ['latin'],
    weight: "300",
  })

export default function MCQZoom(
    {oneFlashcardData, handleQuestionClick,multipleChoiceResponse}: 
    {oneFlashcardData: FlashcardData; handleQuestionClick: React.MouseEventHandler<HTMLButtonElement>; multipleChoiceResponse: string}
) {

    const {multiple_choice_responses: multipleChoiceResponses, question} = oneFlashcardData;
    const [randomisedQuestionSet, setRandomisedQuestionSet] = useState<string[]>([]);
    const [fontSize, setFontSize] = useState<number>(32);
    

    useEffect(() => {
        const shuffledDeck: string[] = shuffle(Object.keys(multipleChoiceResponses as MCQData));
        setRandomisedQuestionSet(shuffledDeck);        
        return
    }, [oneFlashcardData, multipleChoiceResponses])
    
   
    function modifyFontSize (fontSize: number) {

      return setFontSize(fontSize);

    }
    
    return (
        <div className="w-full flex flex-col justify-between px-2 pb-4">
          <Slider
            modifyFontSize={modifyFontSize}
          ></Slider>
                    <div className="flex">
                      <div                                              
                      >
                        <div
                          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question)}}
                          className={`${inconsolata.className} my-5 px-5 py-1 text-center w-full overflow-hidden h-full`}
                          aria-live={multipleChoiceResponse ? "off" : "polite"}
                          style={{fontSize: `${fontSize}px`}}
                        >                          
                        </div>                        
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-0 w-full">
                    
                   {randomisedQuestionSet.map((MCQ: string) => (
                     <div tabIndex={0} role="button" key={MCQ} style={{cursor:'pointer'}} className={clsx('border-2 flex flex-col items-end border-black rounded-lg px-5 py-1',
                        {
                            'bg-elephant-bright-orange': randomisedQuestionSet.indexOf(MCQ) === 0,
                            'bg-elephant-red': randomisedQuestionSet.indexOf(MCQ) === 1,
                            'bg-elephant-orange': randomisedQuestionSet.indexOf(MCQ) === 2,
                            'bg-elephant-pink': randomisedQuestionSet.indexOf(MCQ) === 3
                        }
                     )}>
                      <p
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(multipleChoiceResponses[MCQ as keyof MCQData])}}
                        className={`${inconsolata.className} my-auto box-border px-1 py-1 w-full`}
                        aria-live={multipleChoiceResponse ? "off" : "polite"}
                        style={{fontSize: `${fontSize}px`}}
                      >
                      </p>
                      <button
                        onClick={handleQuestionClick}
                        id={MCQ}
                        className='w-fit mb-3'
                      >
                        <ArrowCommand 
                          command="SELECT"
                          borderGray={false}
                         />
                      </button>
                    </div>
                    ))}
            </div>
        </div>
    )
}