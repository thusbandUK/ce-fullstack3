import React, { useEffect, useState, useRef } from 'react';
import { FlashcardData, MCQData, HTMLElementEvent, customMouseEventHandler } from '@/app/lib/definitions';
import DOMPurify from "isomorphic-dompurify";
import { shuffle } from '@/app/lib/functions';
import clsx from 'clsx';
import {Space_Mono, Inconsolata} from "next/font/google";

const inconsolata = Inconsolata({
    subsets: ['latin'],
    weight: "300",    
  })

export default function Question({question: question, divRef: divRef, multipleChoiceResponse: multipleChoiceResponse}){


    useEffect(() => {
        //console.log('use effect called')
        const resizeText = () => {            
          if (!divRef.current) return;
          //console.log(divRef);
          //console.log('got past early return statement')
          //reset starting font size
          divRef.current.children[0].style.fontSize = `48px`;
          //console.log('supposed size', divRef.current.children[0].style.fontSize)
          let size = 48;
          //reduce font size by increments of 1 until there is no overflow
          while (divRef.current.children[0].scrollHeight > divRef.current.children[0].clientHeight && size > 10) {
            //console.log('current size', size)
            //console.log(divRef.current.children[0].scrollHeight)
            //console.log(divRef.current.children[0].clientHeight)
            size -= 1;
            //console.log(divRef.current.children[0].style.fontSize);
            divRef.current.children[0].style.fontSize = `${size}px`;
            //console.log(divRef.current.children[0]);
          }
        };
    
        resizeText();
        
      }, [question]);

    return (
        <div
          id="div-child"          
          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question)}}
          className={`${inconsolata.className} my-auto px-5 py-1 text-center w-full overflow-hidden h-full`}
          aria-live={multipleChoiceResponse ? "off" : "polite"}
        >
        </div>
    )
}