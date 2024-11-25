"use client"

import Link from "next/link"
import Modal from "./modal"
import ArrowCommand from "./arrowCommand"

export default function MenuItem(
  {
    heading, 
    content, 
    link, 
    modal, 
    identifier,
    receiveEmail,
    logInterest
  }: {
    heading: string, 
    content: string, 
    link: string, 
    modal: boolean, 
    identifier: number,
    receiveEmail: boolean | null,
    logInterest: (examBoard: string) => Promise<void>
  }){

    return (
        <div className="flex h-full flex-col justify-between">
          <div>
            <h6>{heading}</h6>            
            <p>{content}</p>
            <div className="spacer"></div>
            </div>
            { modal === false ? 
            <Link
              href={link}
              className='w-fit'
            >
              <ArrowCommand
                  command={'SELECT'}
                >                  
              </ArrowCommand>              
            </Link>
            :
            <>
              <label htmlFor={`my_modal_${identifier}`} onClick={() => logInterest(heading)}>
                <ArrowCommand
                  command={'INQUIRE'}                  
                ></ArrowCommand>
              </label>
              <Modal
                identifier={identifier}                
              ></Modal>              
            </>
            }
        </div>
    )
}