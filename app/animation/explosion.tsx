"use client"

import React, { useEffect, useState } from 'react';
import './CombinedAnimation2.css';
import Image from 'next/image';
import ChemistryElephantLogo from '../ui/dashboard/chemistryElephantLogo';

//import BubblingFlask from './bubbles';
import ParticleCanvas from "./bubbles2";

const CombinedAnimation2 = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showElephantLogo, setShowElephantLogo] = useState<boolean>(false);
  const [showStars, setShowStars] = useState<boolean>(false);
  const [showBubbles, setShowBubbles] = useState<boolean>(true);

  //returns random number 0 to 3
  const generateRandomNumber = () => {
    let number = Math.floor(Math.random()*4)
    return number;
}

  useEffect(() => {
    setInterval(() => {
      setTimeout(() => {
        setShowBubbles(false)
      }, 3400)
  
  
      setTimeout(() => {
        setIsExpanded(true);
      }, 3100); // Delay for the expansion animation
  
  
      setTimeout(() => {
        setShowStars(true);
      }, 3500)
  
  
      setTimeout(() => {
        setShowElephantLogo(true);
      }, 4000); // After two animation cycles (2 * 0.5s per cycle * 2)

      setTimeout(() => {
        setShowElephantLogo(false);
        setIsExpanded(false);
        setShowStars(false);
        setShowBubbles(true)
      }, 4499)

    }, 4500)    
  }, []);


  return (
    <div className={'animation-container'}>        
          
        
      
      
          
     {/*<BubblingFlask></BubblingFlask>*/}
      {!showElephantLogo && showBubbles && (
        
        <>
        
          <ParticleCanvas
            colour="red"
          ></ParticleCanvas>
          <svg style={{position: 'absolute'}}  width="300" height="300" xmlns="http://www.w3.org/2000/svg">
            <path d="M 125 0 L 125 0 L 125 80 L 175 250 C 180 270 173 282 161 281 L 25 280 C 12 281 10 262 16 249 L 75 80 L 75 0" stroke="black" fill="transparent" />
              
          </svg>
        </>
      )}
    
      {!showElephantLogo && (
        <div className={`animation-container ${isExpanded ? 'expanded' : ''}`}>
            <Image
             src={'/explosion-cloud-transparent.png'} className="explosion-cloud" alt="Explosion Cloud"
             height={100}
             width={100}
            ></Image>          
        </div>
      )}
      
      {showStars && (
        <div className={`stars-container ${showStars ? 'show-stars' : ''}`}>
            <Image
             src={'/star.png'} className="star top-left" alt="Star"
             height={100}
             width={100}
            ></Image>
            <Image
             src={'/star.png'} className="star top-right" alt="Star"
             height={100}
             width={100}
            ></Image>
            <Image
             src={'/star.png'} className="star bottom-left" alt="Star"
             height={100}
             width={100}
            ></Image>
            <Image
             src={'/star.png'} className="star bottom-right" alt="Star"
             height={100}
             width={100}
            ></Image>        
      </div>
      )


      }
      {showElephantLogo && (
        
        <ChemistryElephantLogo
          elephantColour="red"
          sizing={{height: 200, width: 200}}
          
      ></ChemistryElephantLogo>
      
        
      )}
    </div>
  );
};

export default CombinedAnimation2;

//{/*<path d="M 125 0 C 122 -5 125 -17 135 -13 L 125 0 L 125 80 L 175 250 C 180 270 173 282 161 281 L 25 280 C 12 281 10 262 16 249 L 75 80 L 75 0 C 78 -5 76 -14 66 -11" stroke="black" fill="transparent" />*/}       
//<div className="animation-container relative"></div>

/*
<Image
          src={'/site-logo.png'} className="chemistry-elephant-logo" alt="Chemistry Elephant Logo"
          height={100}
          width={100}
       ></Image>
*/