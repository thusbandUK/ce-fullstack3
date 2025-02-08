"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { number } from 'zod';

interface HomeProps {    
    sizing: any;
  }

interface ColorScheme {
  section1: string;
  section2: string;
  section3: string;
  section4: string;
  section5: string;
  section6: string;
  section7: string;
}

const CELogoAnimation: React.FC<HomeProps> = ({sizing}) => {
     //const elephantColour = "blue";
     const backgroundColour = "white";

     const [sectionColours, setSectionColours] = useState<ColorScheme>({
      section1: backgroundColour,
      section2: backgroundColour,
      section3: backgroundColour,
      section4: backgroundColour,
      section5: backgroundColour,
      section6: backgroundColour,
      section7: backgroundColour
     }) 

     const numberArray = [1,2,3,4,5,6,7];
     //const echoedNumberArray: number[] = [];

     const sequenceRandomiser = (array: number[]) => {
      const randomNumber = Math.floor(Math.random() * 2);
      if (randomNumber === 0){
        return array;
      }
      const reversedArray = [];
      for (let x = array.length - 1; x >= 0; x--){
        reversedArray.push(array[x]);
      }
      return reversedArray;
     }

     //let dominoArray = sequenceRandomiser(echoedNumberArray);
     //console.log(dominoArray);
     const dominoArray = [7,6,5,4,3,2,1];
     const randomisedDominoArray = sequenceRandomiser(dominoArray)

const timeout = 150;
let timeout2 = 1800;
let timeoutIndex = 0;
const timeoutArray = [0,500,700,600,800, 1200, 1350, 1200, 1350, 2500, 2700, 2600, 2800, 2700, 2900]
7
const updateState = (section: number, color: string) => {
  setSectionColours(prevState => ({
    ...prevState,
    [`section${section}`]: color, // Updating key1's value
  }));

}

let finalColor = "";

//so you give printColorChoiceAndSection two parameters, array and string - "blinks", "dominoes"
//blinks you pass with numberArray
//dominoes you pass with numberArray2 (which is also [1,2,3,4,5,6,7])
//you don't pass either of them an array
//dominoes on the first pass if the array is [] it randomly generates the array either 1 up or 7 down
//then you get the ripple down domino effect
//as blinks consumes the top array, it creates the second array but adds the numbers in numerical order

const printColorChoiceAndSection = useCallback(() => {
  if (timeoutIndex >=8){
    return
  }
  console.log('printColor pass')
  if (numberArray.length === 0){
    return}
  //console.log(timeoutArray[timeoutIndex]);
 // if (timeoutArray[timeoutIndex] === undefined){
    //return
  //}
    //let workingArray = numberArray;
    //if (numberArray.length === 0){
      //if (echoedNumberArray.length === 0){
        //return
      //} else {
        //workingArray = echoedNumberArray;
      //}        
    //} else {
      //workingArray = numberArray;
    //}
    const selections = {
        section: 0,
        color: ""
    }
    
    const randomPosition = Math.floor(Math.random() * numberArray.length);
    selections.section = numberArray.splice(randomPosition,1)[0];
    
    //const colors = ["red", "yellow", "pink", "blue"];

    const colors = ['#f28972', '#F2C48D', '#D98FBF', '#8268A6'];    

    ////const colors = ['elephant-red', 'elephant-orange', 'elephant-pink', 'elephant-violet']
    const randomColorNumber = Math.floor(Math.random() * 4);
    selections.color = colors[randomColorNumber];
    finalColor === "" ? finalColor = selections.color : null;
    
    setTimeout(() => {
      return updateState(selections.section, selections.color);
    }, timeoutArray[timeoutIndex = timeoutIndex + 1])
    //console.log(timeoutIndex);
    //setTimeout(() => {
      //  return updateState(selections.section, selections.color);
    //}, timeout = timeout + 150)
    //make an array of different times, eg: [2,100,250,260]
    //above term reads arrayName[timeout = timeout + 1]


    setTimeout(() => {
      return updateState(selections.section, backgroundColour);
    }, timeoutArray[timeoutIndex = timeoutIndex + 1])

    //console.log(timeoutIndex);
    //setTimeout(() => {
      //return updateState(selections.section, backgroundColour)
    //}, timeout + 300)

    //setTimeout(() => {
      //return updateState(selections.section, finalColor)
    //}, timeout2 = timeout2 + 150)

    printColorChoiceAndSection()
}, [])

const dominoFinish = useCallback(() => {
  console.log('dominoFinish pass')
  console.log(randomisedDominoArray);
  if (randomisedDominoArray.length === 0){
    return
  }
  finalColor === "pink";

  const selections: any = {
    section: 0,
    color: ""  
}

selections.section = randomisedDominoArray.pop();

setTimeout(() => {
  return updateState(selections.section, finalColor)
}, timeout2 = timeout2 + 25)

dominoFinish()


}, [])

//printColorChoiceAndSection();
  //    dominoFinish();

     useEffect(() => {
      printColorChoiceAndSection();
      dominoFinish();
      
     }, [dominoFinish, printColorChoiceAndSection])


  return (<svg className="m-auto" width={sizing.width} height={sizing.height} viewBox="0 0 900 900" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        fill={sectionColours.section1}
        style={{ fillOpacity: 1 }}
      />
      <path
        d="M384.948 551.167C384.948 540.122 393.902 531.167 404.948 531.167H630.654C641.7 531.167 650.654 540.122 650.654 551.167V697.162C650.654 708.208 641.7 717.162 630.654 717.162H404.948C393.902 717.162 384.948 708.208 384.948 697.162V551.167Z"
        fill={sectionColours.section2}
        style={{ fillOpacity: 1 }}
      />
      <ellipse cx="637.369" cy="352.503" rx="20.6152" ry="21.0733" fill="#202938" style={{ fill: sectionColours.section7, fillOpacity: 1 }} />
      <path
        d="M668.979 554.99C668.979 673.801 737.741 710.602 781.662 716.237C791.978 717.561 800 708.796 800 698.394V352.346C800 341.3 791.046 332.346 780 332.346H688.979C677.933 332.346 668.979 341.259 668.979 352.304V554.99Z"
        fill={sectionColours.section3}
        style={{ fillOpacity: 1 }}
      />
      <path
        d="M638.295 183C756.847 183 793.57 251.758 799.195 295.679C800.516 305.998 791.751 314.021 781.348 314.021L404.948 314.021C393.902 314.021 384.948 305.067 384.948 294.021L384.948 203C384.948 191.954 393.853 183 404.899 183L638.295 183Z"
        fill={sectionColours.section4}
        style={{ fillOpacity: 1 }}
      />
      <path
        d="M254.821 329.597C139.823 329.597 105.246 442.31 100.574 495.389C99.6621 505.752 108.239 513.759 118.642 513.759L345.707 513.759C356.752 513.759 365.707 504.805 365.707 493.759L365.707 349.597C365.707 338.551 356.812 329.597 345.766 329.597L254.821 329.597Z"
        fill={sectionColours.section5}
        style={{ fillOpacity: 1 }}
      />
      <path
        d="M545.773 514.675C425.251 514.675 389.282 402.61 384.585 348.871C383.68 338.506 392.283 330.513 402.687 330.513L585.759 330.513C596.805 330.513 605.759 339.467 605.759 350.513L605.759 494.675C605.759 505.721 596.807 514.675 585.761 514.675L545.773 514.675Z"
        fill={sectionColours.section6}
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

export default CELogoAnimation;