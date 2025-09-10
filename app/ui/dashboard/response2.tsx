import React, { useEffect, useState, useRef } from 'react';
import { FlashcardData, MCQData, pRefsType, HTMLElementEvent, customMouseEventHandler } from '@/app/lib/definitions';
import DOMPurify from "isomorphic-dompurify";
import { shuffle } from '@/app/lib/functions';
import clsx from 'clsx';
import {Space_Mono, Inconsolata} from "next/font/google";

const inconsolata = Inconsolata({
    subsets: ['latin'],
    weight: "300",    
  })


  export default function Response2({response, responseLetter, pRef, pRefs, question, multipleChoiceResponse, highest} : {response: string, responseLetter: string, pRef: React.RefObject<HTMLParagraphElement>, pRefs: pRefsType, question: string, multipleChoiceResponse: string, highest: string}){
      
      /*
      The below useEffect hook sizes the text of the response with the highest character count. Note that
      the function is available in all four of the response components for any given question, which is
      why the first line returns straight away for any of three responses that are not the longest.
      Having chosen the font-size for the longest response, the same font-size is applied to all of the
      other three responses via ref (pRef[A,B,C,D])
      
      */

      useEffect(() => {
        //escapes any call on the function in a response that isn't the longest
        if (!highest) return;
                        
        let finalFontSize: number = 0;
        const resizeText = () => {            
                    
          if (!pRef.current) return;          
                    
          let size = 48;
          
          //reset starting font size
          pRef.current.children[0].style.fontSize = `${size}px`;
         
          //iterates down the font size 1px at a time until the scroll height of the element matches the client height,
          //ie until there is no overflow
          while ((pRef.current.children[0].scrollHeight) > (pRef.current.children[0].clientHeight) && size > 8) {
            
            size -= 1;            
            pRef.current.children[0].style.fontSize = `${size}px`;            
            
          }
          finalFontSize = size;          
        };
    
        resizeText();
        
        //this applies the final font size across all four of the responses
        ["A","B","C","D"].forEach((x) => {
          if (pRefs[x as keyof MCQData].current){
            pRefs[x as keyof MCQData].current.children[0].style.fontSize = `${finalFontSize}px`;
          }
        })
        
      }, [response]);

    return (
      
        <div
          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(response)}}
          className={`${inconsolata.className} my-auto box-border px-1 py-1 w-full overflow-y-hidden h-full`}          
          aria-live={multipleChoiceResponse ? "off" : "polite"}          
        >
        </div>
    )
}

/*
<p
                          ref={pRefs[MCQ as keyof MCQData]}
                          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(multipleChoiceResponses[MCQ as keyof MCQData])}}
                          className={`${inconsolata.className} my-auto h-full overflow-hidden`}
                        ></p>

*/