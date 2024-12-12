import React, { useEffect, useState } from 'react';
import { FlashcardData, MCQData, HTMLElementEvent, customMouseEventHandler } from '@/app/lib/definitions';
import DOMPurify from "isomorphic-dompurify";
import { shuffle } from '@/app/lib/functions';
import clsx from 'clsx';

export default function MultipleChoiceQuestion(
    {oneFlashcardData, handleQuestionClick,multipleChoiceResponse}: 
    {oneFlashcardData: FlashcardData; handleQuestionClick: React.MouseEventHandler<HTMLDivElement>; multipleChoiceResponse: string}
) {

    const {multiple_choice_responses: multipleChoiceResponses, question} = oneFlashcardData;
    const [randomisedQuestionSet, setRandomisedQuestionSet] = useState<string[]>([]);

    /*On *first* render for each question the below sets the randomisedQuestionSet to a shuffled sequence
    of A, B, C, D. This is necessary because the component rerenders when answers are selected (since parent
    component state changes) and without it, the buttons switch places while the feedback is displayed
    */
    useEffect(() => {
        const shuffledDeck: string[] = shuffle(Object.keys(multipleChoiceResponses as MCQData));
        setRandomisedQuestionSet(shuffledDeck);        
        return
    }, [oneFlashcardData])
    //
    //iterates through all the multiple choice responses and returns the number of characters in the longest one
    const returnHighestCharacters = () => {
        let highest: number = 0;
        Object.values(multipleChoiceResponses).forEach((x) => {
            if (x.length > highest){
                return highest = x.length
            }
        })
        return highest;
    }

    const width = screen.width;
    const height = screen.height;
    const heightWidthRatio = height / width;

    /*This is used to estimate the maximum font size that can be used safely to render *all* the multiple choice responses
    into the same size containers with the same font size. It sorts responses into three sizes, based on the number of characters,
    then combines this number with a scaling factor that measures the width of the screen. It is used in the styling of the
    <p> element of the mapped responses. Note that it simply produces a factor by which to multiply the font size, that is 
    provided separately in the above-reffed <p> element
    
    In the future it would be wise to develop a function that renders the boxes to fit text at any size, just not all on the same
    screen, for anyone who requires large text at all times and or in case the textScaler function fails to size text so that it
    all fits
    */
    const textScaler = () => {        

        const characters = returnHighestCharacters();
        
        let charactersScaler: number = 0;
        if (characters < 30){            
            charactersScaler = 1;
        } else if (30 <= characters && characters < 90){            
            charactersScaler = 0.6;
        } else if (90 <= characters && characters < 120) {
            charactersScaler = 0.5;
        } else {           
            charactersScaler = 0.4;
        }
        //defines square root of current screen width
        const widthScaler = Math.sqrt(width);
        const heightScaler = heightWidthRatio > 1.3 ? 1.2 : 1;
        const textScaler = charactersScaler * widthScaler * heightScaler;
        //* 0.7 * heightWidthRatio;
        return textScaler;        
    }

    //const shuffledDeck = shuffle(Object.keys(multipleChoiceResponses as MCQData));

    return (
        <div className="w-full h-full flex flex-col justify-between px-2 pb-4">
                    <div className="h-13-vh md:h-25-vh flex">
                    <h4
                      dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question)}}
                      className="my-auto px-5 py-1 text-center w-full"
                      aria-live={multipleChoiceResponse ? "off" : "polite"}
                    ></h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-0 w-full h-68-vh md:h-56-vh">
                    
                   {randomisedQuestionSet.map((MCQ: string) => (
                     <div onClick={handleQuestionClick} tabIndex={0} role="button" key={MCQ} id={MCQ} style={{cursor:'pointer'}} className={clsx('border-2 h-17-vh md:h-28-vh flex border-black rounded-lg px-5 py-1',
                        {
                            'bg-elephant-bright-orange': randomisedQuestionSet.indexOf(MCQ) === 0,
                            'bg-elephant-red': randomisedQuestionSet.indexOf(MCQ) === 1,
                            'bg-elephant-orange': randomisedQuestionSet.indexOf(MCQ) === 2,
                            'bg-elephant-pink': randomisedQuestionSet.indexOf(MCQ) === 3
                        }
                     )}>
                        <p
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(multipleChoiceResponses[MCQ as keyof MCQData])}}
                        style={{fontSize: `calc(0.10rem * ${textScaler()})`}}
                        className="my-auto"                        
                        ></p>
                    </div>
                    ))}
            </div>
        </div>
    )
}