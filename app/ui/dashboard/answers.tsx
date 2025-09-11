import React, { useEffect } from 'react';
import DOMPurify from "isomorphic-dompurify";
import {Inconsolata} from "next/font/google";

const inconsolata = Inconsolata({
    subsets: ['latin'],
    weight: "300",    
  })

  export default function Answers(
    {
      response,
      pRef,
      multipleChoiceResponse,
      highest,
      responseTextSize,
      editResponseTextSize
    } : {
      response: string,
      pRef: React.RefObject<HTMLDivElement>,
      multipleChoiceResponse: string,
      highest: boolean,
      responseTextSize: number,
      editResponseTextSize: React.Dispatch<React.SetStateAction<number>>
    }
  ){
      
    /*
      The below useEffect hook sizes the text of the response with the highest character count. Note that
      the function is available in all four of the response components for any given question, which is
      why the first line returns straight away for any of three responses that are not the longest.
      As the longest response resizes, the other responses resize at the same time via the 
      responseTextSize constant in the state define in the parent component MulipleChoiceQuestion
      
      */      

      useEffect(() => {
        //escapes any call on the function in a response that isn't the longest
        if (!highest) return;
        if (!pRef.current){
          return;
        }
        if (pRef.current.children[0].scrollHeight > pRef.current.children[0].clientHeight && responseTextSize > 10) {
         
          editResponseTextSize(responseTextSize - 1)
         
        }

      })

    return (
      
        <div
          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(response)}}
          className={`${inconsolata.className} my-auto box-border px-1 py-1 w-full overflow-y-hidden h-full`}
          aria-live={multipleChoiceResponse ? "off" : "polite"}
          style={{fontSize: `${responseTextSize}px`}}
        >
        </div>
    )
}