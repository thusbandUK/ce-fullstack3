import React, { useEffect, useState } from 'react';
import { FlashcardData, MCQData } from '../../lib/definitions';
import { shuffle } from '../../lib/functions';
import clsx from 'clsx';
import {Inconsolata} from "next/font/google";
import DOMPurify from "isomorphic-dompurify";
import ArrowCommand from './arrowCommand';
import Slider from './slider';

/*
This component renders the version of the multiple choice questions that can be enlarged using the slider
It shares much of its code and functionality with mcqNoZoom, but the crucial differences are that:
1) arrow (select) buttons are rendered for each response and the button must be clicked to select that
response (as opposed to in mcqNoZoom in which clicking anywhere on the response selects that answer.
The difference is to facilitate scrolling when the responses and question have collectively come
to fill a space larger than the screen
2) the text can be resized, using the slider
)

props:

It is passed 
oneFlashcardData, an object containing the question, potential responses and etc for the flashcard component
handleQuestionClick - an event handler in the parent FlashcardPresentation component 
      (calls another function w event.target.id, this triggers render of the MultipleChoiceResponse component, 
        passing either "right" or "wrong", which in turn renders a short-lived modal saying telling the user
      the feedback)
multipleChoiceResponse - simply passes the current value held in state, which is either "right" or "wrong"
        This tallies between "off" and "polite" versions of aria-live, so that screen reader is transferred
        between feedback modal and next question text
referredViaIndividual - if the user has searched with a three-letter code to obtain the answer to just 
        one flashcard, this is set to true with the effect that the sequence of potential responses
        is no longer randomised, and also that each response starts with A:, B:, C: or D:

*/

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
                          disabled={false}
                         />
                      </button>
                    </div>
                    ))}
            </div>
        </div>
    )
}