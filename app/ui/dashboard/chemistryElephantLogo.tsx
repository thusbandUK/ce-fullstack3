"use client";

import React from 'react';
import { useState, useEffect, useCallback } from 'react';

interface HomeProps {
    elephantColour: string;
    sizing: any;
  }

  /*
  'elephant-red': '#f28972',
        'elephant-orange': '#F2C48D',
        'elephant-pink': '#D98FBF',
        'elephant-violet': '#8268A6',
        'elephant-bright-orange': '#F2B441',
  */
const ChemistryElephantLogo: React.FC<HomeProps> = ({elephantColour, sizing}) => {

  const backgroundColour = 'black';
  //const elephantColour = '#D98FBF';
     
  /*
     const [backgroundColour, setBackgroundColour] = useState("#f28972")
     const [currentIndex, setCurrentIndex] = useState(0);    

     useEffect(() => {
      const colours = ['#f28972', '#F2C48D', '#D98FBF', '#8268A6', '#F2B441',];      

      let newIndex = 0;
      if (currentIndex <= 3){
        newIndex = currentIndex + 1;
      } else {
        newIndex = 0;
      }
      
      setCurrentIndex(newIndex);
      
      setTimeout(() => {
        setBackgroundColour(colours[newIndex])
      }, 2000)
       
     }, [backgroundColour])
     */

  return (<svg style={{backgroundColor: backgroundColour, borderRadius: "10%"}} width={sizing.width} height={sizing.height} viewBox="0 0 900 900" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      width={sizing.width}
      height={sizing.height}
      rx="39.1642"
      fill={backgroundColour}
      style={{ fillOpacity: 1 }}
    />
    <g filter="url(#filter0_d_7400_5)">
      <path
        d="M100 551.167C100 540.122 108.954 531.167 120 531.167H345.707C356.753 531.167 365.707 540.122 365.707 551.167V697.162C365.707 708.208 356.752 717.162 345.707 717.162H120C108.954 717.162 100 708.208 100 697.162V551.167Z"
        fill={elephantColour}
        style={{ fillOpacity: 1 }}
      />
      <path
        d="M384.948 551.167C384.948 540.122 393.902 531.167 404.948 531.167H630.654C641.7 531.167 650.654 540.122 650.654 551.167V697.162C650.654 708.208 641.7 717.162 630.654 717.162H404.948C393.902 717.162 384.948 708.208 384.948 697.162V551.167Z"
        fill={elephantColour}
        style={{ fillOpacity: 1 }}
      />
      <ellipse cx="637.369" cy="352.503" rx="20.6152" ry="21.0733" fill="#202938" style={{ fill: elephantColour, fillOpacity: 1 }} />
      <path
        d="M668.979 554.99C668.979 673.801 737.741 710.602 781.662 716.237C791.978 717.561 800 708.796 800 698.394V352.346C800 341.3 791.046 332.346 780 332.346H688.979C677.933 332.346 668.979 341.259 668.979 352.304V554.99Z"
        fill={elephantColour}
        style={{ fillOpacity: 1 }}
      />
      <path
        d="M638.295 183C756.847 183 793.57 251.758 799.195 295.679C800.516 305.998 791.751 314.021 781.348 314.021L404.948 314.021C393.902 314.021 384.948 305.067 384.948 294.021L384.948 203C384.948 191.954 393.853 183 404.899 183L638.295 183Z"
        fill={elephantColour}
        style={{ fillOpacity: 1 }}
      />
      <path
        d="M254.821 329.597C139.823 329.597 105.246 442.31 100.574 495.389C99.6621 505.752 108.239 513.759 118.642 513.759L345.707 513.759C356.752 513.759 365.707 504.805 365.707 493.759L365.707 349.597C365.707 338.551 356.812 329.597 345.766 329.597L254.821 329.597Z"
        fill={elephantColour}
        style={{ fillOpacity: 1 }}
      />
      <path
        d="M545.773 514.675C425.251 514.675 389.282 402.61 384.585 348.871C383.68 338.506 392.283 330.513 402.687 330.513L585.759 330.513C596.805 330.513 605.759 339.467 605.759 350.513L605.759 494.675C605.759 505.721 596.807 514.675 585.761 514.675L545.773 514.675Z"
        fill={elephantColour}
        style={{ fillOpacity: 1 }}
      />
    </g>
    <defs>
      <filter id="filter0_d_7400_5" x="93" y="177" width="720" height="554.162" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dx="3" dy="4" />
        <feGaussianBlur stdDeviation="5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7400_5" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7400_5" result="shape" />
      </filter>
    </defs>
  </svg>)
};

export default ChemistryElephantLogo;