import Link from "next/link"

export default function MenuItem({heading, content, link}: {heading: string, content: string, link: string}){

    return (
        <div className="flex h-full flex-col justify-between">
          <div>
            <h6>{heading}</h6>            
            <p>{content}</p>
            <div className="spacer"></div>
            </div>
            <Link
              href={link}
              className='w-fit'
            >
              <div className="flex">
              <div className="border-2 border-black rounded-md w-fit p-2 hover:bg-black hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 hover:white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
              <p className="ms-3 my-auto">SELECT</p>
              </div>
            </Link>
        </div>
    )

}