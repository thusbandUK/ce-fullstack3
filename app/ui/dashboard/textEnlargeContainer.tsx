"use client"
import TextEnlarge from "./textEnlarge"
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation'

/*
The function of this container is conditionally to render the TextEnlarge button only on suitable pages,
at current: the flashcards dashboard. The parent element (Navbar) cannot read the url or manage state,
since it is a server component
*/

export default function TextEnlargeContainer (){

  const [showButton, setShowButton] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    pathname.includes("flashcard") && pathname.includes("set") ? setShowButton(true) : setShowButton(false);
  }, [pathname])

    return (
        <div>
          {
            showButton ?
          
              <TextEnlarge>
              </TextEnlarge>
            :
            null
          }
        </div>
    )
}