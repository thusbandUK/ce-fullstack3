"use client"

import React, { useEffect, useState } from 'react';
import './CombinedAnimation2.css';
import Image from 'next/image';

const CombinedAnimation2 = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showElephantLogo, setShowElephantLogo] = useState<boolean>(false);
  const [showStars, setShowStars] = useState<boolean>(false);
  const [showBubbles, setShowBubbles] = useState<boolean>(false);

  //returns random number 0 to 3
  const generateRandomNumber = () => {
    let number = Math.floor(Math.random()*4)
    return number;
}

  useEffect(() => {
    setTimeout(() => {
      setIsExpanded(true);
    }, 100); // Delay for the expansion animation


    setTimeout(() => {
      setShowStars(true);
    }, 500)


    setTimeout(() => {
      setShowElephantLogo(true);
    }, 1500); // After two animation cycles (2 * 0.5s per cycle * 2)
  }, []);


  return (
    <div className={'animation-container'}>
      
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
        <Image
          src={'/site-logo.png'} className="chemistry-elephant-logo" alt="Chemistry Elephant Logo"
          height={100}
          width={100}
       ></Image>
      )}
    </div>
  );
};

export default CombinedAnimation2;