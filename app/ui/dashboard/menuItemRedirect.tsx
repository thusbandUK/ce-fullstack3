"use client"

import Link from "next/link"
import Modal from "./modal"
import ArrowCommand from "./arrowCommand"
import clsx from 'clsx';
import { ModalContent } from "@/app/lib/definitions";

export default function MenuItemRedirect(
  {
    heading, 
    content,
    dbCall,
    arrowCommand,
  }: {
    heading: string, 
    content: string,
    //dbCall: ((examboard: string) => void) | (({topic}: {topic: string}) => void)   
    dbCall: (heading: string) => void 
    arrowCommand: string | null,
  }){

    const modalContent = null;
    
    const handleClick = () => {      
      
      return dbCall(heading);
    }

    return (
      <div className='border-2 border-black rounded-lg p-5'>
        <div className={clsx("flex h-full flex-col justify-between",
          {
            'text-black': modalContent === null,
            'text-slate-400': modalContent !== null
          }
        )}>
          <div>
            <h6>{heading}</h6>            
            <p>{content}</p>
            <div className="spacer"></div>
            </div>
            
            <button
            onClick={handleClick}
            className='w-fit'
          >
            <ArrowCommand
                command={arrowCommand}
                borderGray={false}
                disabled={false}
              >                  
            </ArrowCommand>
          </button>
            
        </div>
        </div>
    )
}