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
    {
      oneFlashcardData,
      handleQuestionClick,
      multipleChoiceResponse,
      referredViaIndividual
    }: 
    {
      oneFlashcardData: FlashcardData;
      handleQuestionClick: React.MouseEventHandler<HTMLButtonElement>;
      multipleChoiceResponse: string;
      referredViaIndividual: boolean
    }
) {

    const {multiple_choice_responses: multipleChoiceResponses, question} = oneFlashcardData;
    const [questionSet, setQuestionSet] = useState<string[]>([]);
    const [fontSize, setFontSize] = useState<number>(32);
    

    useEffect(() => {
      if (referredViaIndividual){
        setQuestionSet(Object.keys(multipleChoiceResponses as MCQData));
        return
      }
        const shuffledDeck: string[] = shuffle(Object.keys(multipleChoiceResponses as MCQData));        
        setQuestionSet(shuffledDeck);        
        return
    }, [oneFlashcardData, multipleChoiceResponses])
    
   
    function modifyFontSize (fontSize: number) {

      return setFontSize(fontSize);

    }
    //text-elephant-pink bg-black
    return (
        <div className="w-full flex flex-col justify-between px-2 pb-4">
          <div className="flex items-center">
            <div className="p-3" aria-hidden="true">
              <p className="text-lg">A</p>
            </div>
            <Slider
              modifyFontSize={modifyFontSize}
            ></Slider>
            <div className="p-3" aria-hidden="true">
              <p className="text-4xl">A</p>
            </div>
          </div>

                    <div className="flex">
                      <div                                              
                      >
                        <div
                          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question)}}
                          className={clsx(`${inconsolata.className} my-5 px-5 py-1 text-center w-full overflow-hidden h-full`,
                            {
                              'break-normal': fontSize <= 60,
                              'break-all': fontSize > 60
                            }
                          )}
                          aria-live={multipleChoiceResponse ? "off" : "polite"}
                          style={{fontSize: `${fontSize}px`}}
                          tabIndex={0}
                          aria-label="question"
                        >                          
                        </div>                        
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-0 w-full">
                    
                   {questionSet.map((MCQ: string) => (
                     <div key={MCQ} style={{cursor:'pointer'}} className={clsx('border-2 flex flex-col items-end border-black rounded-lg px-5 py-1',
                        {
                            'bg-elephant-bright-orange': questionSet.indexOf(MCQ) === 0,
                            'bg-elephant-red': questionSet.indexOf(MCQ) === 1,
                            'bg-elephant-orange': questionSet.indexOf(MCQ) === 2,
                            'bg-elephant-pink': questionSet.indexOf(MCQ) === 3
                        }
                     )}>
                      <p
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(`${ referredViaIndividual ? `${MCQ}: ` : ""}${multipleChoiceResponses[MCQ as keyof MCQData]}`)}}
                        className={clsx(`${inconsolata.className} my-auto box-border px-1 py-1 w-full`,
                          {
                            'break-normal': fontSize <= 60,
                            'break-all': fontSize > 60
                          }
                        )}
                        aria-live={multipleChoiceResponse ? "off" : "polite"}
                        style={{fontSize: `${fontSize}px`}}
                        aria-label={`possible answer ${questionSet.indexOf(MCQ) + 1}`}
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