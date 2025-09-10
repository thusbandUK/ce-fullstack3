import React, { useEffect, useState, useRef } from 'react';
import { FlashcardData, MCQData, HTMLElementEvent, customMouseEventHandler } from '@/app/lib/definitions';
import DOMPurify from "isomorphic-dompurify";
import { shuffle } from '@/app/lib/functions';
import clsx from 'clsx';
import {Space_Mono, Inconsolata} from "next/font/google";

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: "400",
  variable: "--font-space-mono"
})

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
    const [longestResponse, setLongestResponse] = useState<string>("");

    const divRef = useRef<HTMLDivElement>(null);

    const pRefs = {
        A: useRef<HTMLParagraphElement>(null),
        B: useRef<HTMLParagraphElement>(null),
        C: useRef<HTMLParagraphElement>(null),
        D: useRef<HTMLParagraphElement>(null)
    }

    /*New resizing logic for question*/

    useEffect(() => {
        const resizeText = () => {            
          if (!divRef.current) return;
          //reset starting font size
          divRef.current.style.fontSize = `48px`;
          let size = 48;
          //reduce font size by increments of 1 until there is no overflow
          while (divRef.current.scrollHeight > divRef.current.clientHeight && size > 10) {            
            size -= 1;
            divRef.current.style.fontSize = `${size}px`;
          }
        };
    
        resizeText();
        
      }, [question]);

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
    //
    //iterates through all the multiple choice responses and returns the number of characters in the longest one
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
                
          //setLongestResponse(highest.response);
        //return highest.number;
        return highest.response;
    }

    
    //console.log('longestResponse', longestResponse)
    /*Same function as the above useEffect, but it resizes the response text */
    /**/
    useEffect(() => {
        console.log('resizing useEffect called')
                
        let finalFontSize: number = 0;
        const resizeText = () => {            
          
          const pRef = pRefs[returnHighestCharacters() as keyof MCQData];
          if (!pRef.current) return;
          console.log('useEffect function got past the early return for null current')
          //reset starting font size
          pRef.current.style.fontSize = '48px';
          
          let size = 48;
          //reduce font size by increments of 1 until there is no overflow
          console.log('scrollHeight', pRef.current.scrollHeight)
          console.log('clientHeight', pRef.current.clientHeight)
          while (pRef.current.scrollHeight > pRef.current.clientHeight && size > 6) {
            console.log('current size', size);
            size -= 1;
            pRef.current.style.fontSize = `${size}px`;
          }
          finalFontSize = size;
        };
    
        resizeText();
        if (pRefs.A.current){            
            pRefs.A.current.style.fontSize = `${finalFontSize}px`;
        }
        if (pRefs.B.current){
            pRefs.B.current.style.fontSize = `${finalFontSize}px`;
        }
        if (pRefs.C.current){
            pRefs.C.current.style.fontSize = `${finalFontSize}px`;
        }
        if (pRefs.D.current){
            pRefs.D.current.style.fontSize = `${finalFontSize}px`;
        }
        
        
      }, [question]);    

    return (
        <div className="w-full h-full flex flex-col justify-between px-2 pb-4">
                    <div className="h-13-vh md:h-25-vh flex">
                    <div
                      ref={divRef}
                      dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question)}}
                      className={`${inconsolata.className} my-auto px-5 py-1 text-center w-full overflow-hidden text-4xl h-full`}
                      aria-live={multipleChoiceResponse ? "off" : "polite"}
                    ></div>
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
                          ref={pRefs[MCQ as keyof MCQData]}
                          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(multipleChoiceResponses[MCQ as keyof MCQData])}}
                          className={`${inconsolata.className} my-auto h-full overflow-hidden`}
                        ></p>
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