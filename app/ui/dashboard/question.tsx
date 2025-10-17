import React, { useEffect, useState } from 'react';
import DOMPurify from "isomorphic-dompurify";
import {Inconsolata} from "next/font/google";

const inconsolata = Inconsolata({
    subsets: ['latin'],
    weight: "300",    
  })

export default function Question(
  {
    question,
    divRef,
    multipleChoiceResponse
  }:{
    question: string,
    divRef: React.RefObject<HTMLDivElement>,
    multipleChoiceResponse: string
  }
){

  const [resizeableFontValue, setResizeableFontValue] = useState(48)

  useEffect(() => {
    setResizeableFontValue(48);
  }, [question]);

  useEffect(() => {
   
    if (!divRef.current){
      return;
    }
    if (divRef.current.children[0].scrollHeight > divRef.current.children[0].clientHeight && resizeableFontValue > 10) {
      setResizeableFontValue(resizeableFontValue - 1);
    }
  
  }, [divRef, resizeableFontValue])

    return (
        <div
          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question)}}
          className={`${inconsolata.className} my-auto px-5 py-1 text-center w-full overflow-hidden h-full`}
          aria-live={multipleChoiceResponse ? "off" : "polite"}
          style={{fontSize: `${resizeableFontValue}px`}}
        >
        </div>
    )
}