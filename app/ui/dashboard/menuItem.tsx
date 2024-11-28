"use client"

import Link from "next/link"
import Modal from "./modal"
import ArrowCommand from "./arrowCommand"
import clsx from 'clsx';
import { ModalContent } from "@/app/lib/definitions";

export default function MenuItem(
  {
    heading, 
    content, 
    link,    
    modalContent,
    identifier,    
    logInterest,
    arrowCommand
  }: {
    heading: string, 
    content: string, 
    link: string,
    modalContent: null | ModalContent,
    identifier: number | null,    
    logInterest: null | ((examBoard: string) => Promise<void>),
    arrowCommand: string | null
  }){

    
    const handleClick = () => {      
      if (!logInterest) {
        return
      }
      return logInterest(heading);
    }

    return (
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
            { modalContent === null ? 
            <Link
              href={link}
              className='w-fit'
              prefetch={false}              
            >
              <ArrowCommand
                  command={arrowCommand}
                  borderGray={modalContent!==null}
                >                  
              </ArrowCommand>              
            </Link>
            :
            <>
              <label htmlFor={`my_modal_${identifier}`} className="cursor-pointer" onClick={handleClick}>
                <ArrowCommand
                  command={arrowCommand}
                  borderGray={modalContent!==null}
                ></ArrowCommand>
              </label>
              <Modal
                identifier={identifier}
                modalContent={modalContent}
              ></Modal>              
            </>
            }
        </div>
    )
}