"use client"

import React, { useState, useEffect, useCallback } from 'react';
import IndividualElephantSvg from './individualElephantSvg';

/*
This is an arguably slightly convoluted module, which animates the transfer of an elephant from one
part of the screen to another then back again, repeated indefinitely via a setInterval function in the
bottom useEffect function.
Various let variables keep track of which part of which elephant is being recoloured at which moment and
others keep track of what colour each elephant should appear
It would be more "proper" I think if all the updated values were held in state rather than global let
variables. If it were to be updated in that way, I think a third, grandparent component would have to be
developed, so that the child and grandchild would be rerendered on each update of the state, but this is
sufficient for now
*/


export interface ColorScheme {
  section1: string;
  section2: string;
  section3: string;
  section4: string;
  section5: string;
  section6: string;
  section7: string;
}

const IndividualElephantContainer = () => {
     
     const backgroundColour = "white";

     const [colourPalette, setColourPalette] = useState<string[]>(['#f28972', '#F2C48D', '#D98FBF', '#8268A6']);
     const [currentColour, setCurrentColour] = useState<string>(colourPalette[Math.floor(Math.random() * 4)]);     
     const [ screenWidth, setScreenWidth ] = useState<number>(0)    
     const [sectionColours, setSectionColours] = useState<ColorScheme>({
        section1: backgroundColour,
        section2: backgroundColour,
        section3: backgroundColour,
        section4: backgroundColour,
        section5: backgroundColour,
        section6: backgroundColour,
        section7: backgroundColour
       }) 
      
     const [screenHeight, setScreenHeight] = useState<number>(400)

     //sets screen width
     useEffect(() => {
      return setScreenWidth(window.innerWidth)
     }, [window.innerWidth])
    
     //similar principle as above, remainingColours is emptied as usedColours is filled, once the
     //former is emptied, it is filled with the usedColours values and usedColours is emptied
     let remainingColours: string[] = ['#F28972', '#F2C48D', '#D98FBF', '#8268A6'];
     
     let usedColours: string[] = [];
    
     //this is updated with the returned value of the below function colourSelector, which is called
     //on the first pass through each of the recursive functions, emptyElephantA and ...B
     //let nextColour = "";

     
     //this updates the state in which the current colours of each section of elephants A and B
     //are stored
     const updateState = (section: number, color: string) => {
      setSectionColours(prevState => ({
        ...prevState,
        [`section${section}`]: color, // Updating key1's value
      }));
    }

     //works through the remainingColours array above to cycle through the four available colours
     //in a random order, before then starting again from the beginning
     const colourSelector = () => {
       if (remainingColours.length === 0){
         remainingColours = usedColours;
         usedColours = [];
       }  
       const index = Math.floor(Math.random() * remainingColours.length);
       const selectedColour = remainingColours.splice(index, 1)[0];
       usedColours.push(selectedColour);
       return selectedColour;
     }
     
     let finalColor = "";

     let timeout3 = 25;

     const dominoFinish2 = useCallback(() => {

      const arrayToConsume = [1,2,3,4,5,6,7]
      const finalColour = colourSelector();

      arrayToConsume.forEach((x) => {
        setTimeout(() => {
          return updateState(x, finalColour)
        }, timeout3 = timeout3 + 25)
      })

      timeout3 = timeout3 + 2000;
      for (let y = arrayToConsume.length; y > 0; y--){
        setTimeout(() => {
          return updateState(y, 'white')
        }, timeout3 = timeout3 + 25)
      }
   
      timeout3 = timeout3 + 2000;

     }, [])

     useEffect(() => {

      let maxInterval = 0;
      const intervalRoutine = setInterval(() => {
        dominoFinish2()
        timeout3 = timeout3 + 2500;
        if (++maxInterval > 1000){
          window.clearInterval(intervalRoutine)
        }

      }, 1)
      
     }, [])

  return (
    <>
    { 
      screenWidth ? 
      <IndividualElephantSvg
        sectionColours={sectionColours}
        screenHeight={screenHeight}
        screenWidth={screenWidth}
      ></IndividualElephantSvg>
      : 
      null
    
    }
      
    </>
  )
};

export default IndividualElephantContainer;