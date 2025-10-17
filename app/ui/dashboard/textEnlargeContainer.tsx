"use client"

import TextEnlarge from "./textEnlarge"
import { useEffect, useContext } from "react";
import { usePathname } from 'next/navigation';
import { TextSizeButtonContext } from '@/app/providers';

/*
The function of this container is conditionally to render the TextEnlarge button only on suitable pages,
at current: only when mcqZoom or mcqNoZoom is rendered. The parent element (Navbar) cannot read the url or manage state,
since it is a server component
*/

export default function TextEnlargeContainer (){

  //extracts pathname
  const pathname = usePathname();

  //extracts boolean and function from TextSizeButtonContext
  const { buttonShowing, showButton } = useContext(TextSizeButtonContext);

  //removes button if the pathname doesn't include "set", which would only happen if someone
  //navigated away from the mcq page
  useEffect(() => {
    if (!pathname.includes("set")){
      showButton(false)
    }    
  }, [pathname])

    return (
        <div>
          {
            buttonShowing ?
          
              <TextEnlarge>
              </TextEnlarge>
            :
            null
          }
        </div>
    )
}