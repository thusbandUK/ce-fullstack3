"use client"

import Link from "next/link"
import Modal from "./modal"
import ArrowCommand from "./arrowCommand"
import clsx from 'clsx';

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
        <div className={clsx("flex h-full flex-col justify-between",
          {
            'text-black': modal === false,
            'text-slate-400': modal === true
          }
        )}>
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
                  borderGray={modal}
                >                  
              </ArrowCommand>              
            </Link>
            :
            <>
              <label htmlFor={`my_modal_${identifier}`} className="cursor-pointer" onClick={() => logInterest(heading)}>
                <ArrowCommand
                  command={'INQUIRE'}
                  borderGray={modal}
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