"use client"
import CELogoAnimation from "./cELogoAnimation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";


const CELogoContainer = () => {
    const [display, setDisplay] = useState(true);
    const [runAlready, setRunAlready] = useState(false);
    
    const path = usePathname();  
    
    useEffect(() => {
        
        let timeBeforeHide = 3000;
        if (runAlready){
            return setDisplay(false);
        }
        if (path !== '/'){
            setRunAlready(true)
        }

        setTimeout(() => {
            setRunAlready(true)
            return setDisplay(false);                        
        }, timeBeforeHide)
    })


    return (
        <>
        {(path !== '/') ? null :
        <div style={{height: '100%', display: display ? 'block' : 'none'}} className="loader">
            <div style={{height: '100%'}} className="m-auto flex">
                <CELogoAnimation
                  sizing={{height: 200, width: 200}}                  
                />
            </div>
        </div>
        }

</>

    )
}

export default CELogoContainer;