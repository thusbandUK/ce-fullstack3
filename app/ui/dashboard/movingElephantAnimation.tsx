"use client"

import React, { useState, useEffect, useCallback } from 'react';
import MovingElephantSVG from './movingElephantSVG';
//import { randomColorNumber } from './animationFunctions';

interface HomeProps {    
    sizing: any;
  }

export interface ColorScheme {
  section1: string;
  section2: string;
  section3: string;
  section4: string;
  section5: string;
  section6: string;
  section7: string;
}

interface DoubleColorScheme {
  elephantA: {
    section1: string;
    section2: string;
    section3: string;
    section4: string;
    section5: string;
    section6: string;
    section7: string;
  },
  elephantB: {
    section1: string;
    section2: string;
    section3: string;
    section4: string;
    section5: string;
    section6: string;
    section7: string;
  }
}

const MovingElephantAnimation: React.FC<HomeProps> = ({sizing}) => {
     
     const backgroundColour = "white";

     const [colourPalette, setColourPalette] = useState<string[]>(['#f28972', '#F2C48D', '#D98FBF', '#8268A6']);
     const [sectionColours, setSectionColours] = useState<DoubleColorScheme>({
      elephantA: 
      /*{
        section1: backgroundColour,
        section2: backgroundColour,
        section3: backgroundColour,
        section4: backgroundColour,
        section5: backgroundColour,
        section6: backgroundColour,
        section7: backgroundColour
      },*/
      {
        section1: 'red',
        section2: 'red',
        section3: 'red',
        section4: 'red',
        section5: 'red',
        section6: 'red',
        section7: 'red'
      },
      elephantB: {
        section1: backgroundColour,
        section2: backgroundColour,
        section3: backgroundColour,
        section4: backgroundColour,
        section5: backgroundColour,
        section6: backgroundColour,
        section7: backgroundColour
      }
     })
     const [firstElephantRemaining, setFirstElephantRemaining] = useState<number[]>([1,2,3,4,5,6,7]);
     const [secondElephantRemaining, setSecondElephantRemaining] = useState<number[]>([]);
     const [emptyingFirst, setEmptyingFirst] = useState<boolean>(true);
     const [currentColour, setCurrentColour] = useState<string>(colourPalette[Math.floor(Math.random() * 4)]);

     


     const numberArray = [1,2,3,4,5,6,7];
/*
     useEffect(() => {
      const randomColorNumber = Math.floor(Math.random() * 4);
      const initialColour = colourPalette[randomColorNumber]; 
      
      let newColourSet: DoubleColorScheme = {...sectionColours};

      numberArray.forEach((x) => {

        return newColourSet.elephantA[`section${x}` as keyof ColorScheme] = initialColour;
          }
        )
        
        return setSectionColours(newColourSet);
      
     }, [])
    
*/
    
     /*
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
*/
     /*
     const dominoArray = [7,6,5,4,3,2,1];
     const randomisedDominoArray = sequenceRandomiser(dominoArray)

const timeout = 150;
let timeout2 = 1800;
let timeoutIndex = 0;
const timeoutArray = [0,500,700,600,800, 1200, 1350, 1200, 1350, 2500, 2700, 2600, 2800, 2700, 2900]

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
*/

/*
useEffect(() => {

  //or .length - 1?
  const index = Math.floor(Math.random() * numberArray.length);

  
  let updatedColours: DoubleColorScheme = {...sectionColours};

  //sectionColours.elephantA[`section${index}` as keyof ColorScheme]    
  //[`section${index}` as keyof ColorScheme]: "",
    //elephantB: sectionColours.elephantA

    const randomColorNumber = Math.floor(Math.random() * 4);
    const newColour = colourPalette[randomColorNumber]; 

  numberArray.forEach((x) => {
    setTimeout(() => {
      updatedColours.elephantB[`section${x}` as keyof ColorScheme] = sectionColours.elephantA[`section${x}` as keyof ColorScheme]
      updatedColours.elephantA[`section${x}` as keyof ColorScheme] = newColour;
    return setSectionColours(updatedColours);

    }, 2000)
    
  })
}, [])*/

let countdown = [1,2,3,4,5,6,7]

let slidesToTickOff = [1,2,3,4,5,6,7]

let elephantARemaining: number[] = [1,2,3,4,5,6,7]

let elephantBRemaining: number[] = []

//const newColour = colourPalette[Math.floor(Math.random() * 4)];
    
    //setCurrentColour(newColour);

    const updateState = (slide: number, elephant: string) => {
     
      setSectionColours(prevState => ({
        ...prevState,
        elephantA: {
          ...prevState.elephantA,
          [`section${slide}`]: elephant === "A" ? "white" : currentColour
        },
        elephantB: {
          ...prevState.elephantB,
          [`section${slide}`]: elephant === "B" ? "white" : currentColour
        }
      }))
      
      return
    }

    let timeout = 1500;
let timeout2 = 1800;
let timeoutIndex = 0;
const timeoutArray = [0,500,700,600,800, 1200, 1350, 1200, 1350, 2500, 2700, 2600, 2800, 2700, 2900]


const updateEmptyingFirst = () => {
  return setEmptyingFirst(false);
}

const emptyElephantA = useCallback(() => {
  if (elephantARemaining.length === 0){
    timeout = timeout + 2000
    return;
  }
  //console.log('timeout via A', timeout)

 const randomIndex = Math.floor(Math.random() * elephantARemaining.length)

 const randomSlideReference: number = elephantARemaining.splice(randomIndex, 1)[0]

 elephantBRemaining.push(randomSlideReference); 
 
 setTimeout(() => {  
  return updateState(randomSlideReference, "A")

 }, timeout = timeout + 100)

 emptyElephantA()
}, [])

const emptyElephantB = useCallback(() => {
  if (elephantBRemaining.length === 0){
    timeout = timeout + 2000
    return;
  }
  //console.log('timeout via B', timeout)

 const randomIndex = Math.floor(Math.random() * elephantBRemaining.length)

 const randomSlideReference: number = elephantBRemaining.splice(randomIndex, 1)[0]

 elephantARemaining.push(randomSlideReference); 
 
 setTimeout(() => {  
  return updateState(randomSlideReference, "B")

 }, timeout = timeout + 100)

 emptyElephantB()
}, [])

     useEffect(() => {
      setInterval(() => {
        emptyElephantA()
        timeout = timeout + 1500;
        emptyElephantB();
        timeout = 1500;
      }, 6000)      
      
     }, [emptyElephantA, emptyElephantB])

  return (
    <>    
  
      <MovingElephantSVG
        sectionColours={sectionColours.elephantA}        
      ></MovingElephantSVG>

      <MovingElephantSVG
        sectionColours={sectionColours.elephantB}        
      ></MovingElephantSVG> 
    </>

  )
};

export default MovingElephantAnimation;