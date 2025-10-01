"use client"
import TextEnlarge from "./textEnlarge"
import { createContext, useContext, useState } from 'react';


//export const TextSizeButtonContext = createContext(false);
/*const SidebarContext = createContext();

export function Sidebar() {
  const [isOpen, setIsOpen] = useState();

  return (
    <SidebarContext.Provider value={{ isOpen }}>
      <SidebarNav />
    </SidebarContext.Provider>
  );
}*/

export default function TextEnlargeContainer (){

    /*const [showSlider, setShowSlider] = useState<boolean>(false);*/

    const handleClick = () => {
        console.log('handleParentClick triggered')
        //return setShowSlider(!showSlider);
    }

    return (
        <div>
            {/*
              <TextEnlarge
                handleParentClick={handleClick}
              >
    </TextEnlarge>*/}
              
        </div>
    )
}

/*
<TextSizeButtonContext.Provider value={showSlider}>
                
              </TextSizeButtonContext.Provider>
*/