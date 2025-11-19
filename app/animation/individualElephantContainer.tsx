"use client"

import React, { useState, useEffect, useCallback } from 'react';
import IndividualElephantSvg from './individualElephantSvg';
import { ColourManagementClass, TimeoutClass } from './animationFunctions';

/*
This animates a stand-alone elephant, which is placed in the parent element of the component which calls 
it. (Previous versions used css anchors but they're not compatible with various browsers.)
Although it's stand-alone, two called in tandem can be made to appear as if they are teleporting back 
and forth by calling the first one with startWhite prop = false, and the second with true (or vice versa)
(defaults to true, ie starting white)

Each instance of the elephant creates a new instance of ColourManagementClass (./animationFunctions), 
which oversees the cycling between the four different colours in random sequence.

The size of the elephant is controlled by the sizeModifier prop which:
1) defaults to 0.2
2) is multiplied by window.screenWidth to give its width (equal to its height) in pixels

Similarly, each instance also has its own timeoutInstance from TimeoutClass (./animationFunctions),
which manages the values passed to the timeout functions in a way that doesn't require any global
let variables

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

interface ElephantProps {
  startWhite?: boolean;
  sizeModifier?: number;
}

/* Note how default props are defined below */
const IndividualElephantContainer: React.FC<ElephantProps>= ({startWhite = true, sizeModifier = 0.2}
) => {

     //creates new instance of ColourManagementClass (see animationFunctions)
     const colourManagementInstance = new ColourManagementClass;

     //creates new instance of TimeoutClass (see animationFunctions)
     const timeoutInstance = new TimeoutClass;

     //the elephant cycles between white and one of the other four colours, but with the startWhite prop
     //means that white is the first colour, otherwise a random colour is selected for teh starting colour
     const initialBackgroundColour = startWhite ? "white" : colourManagementInstance.objectColourSelector();

     const [ screenWidth, setScreenWidth ] = useState<number>(0)
     const [ sectionColours, setSectionColours ] = useState<ColorScheme>({
        section1: initialBackgroundColour,
        section2: initialBackgroundColour,
        section3: initialBackgroundColour,
        section4: initialBackgroundColour,
        section5: initialBackgroundColour,
        section6: initialBackgroundColour,
        section7: initialBackgroundColour
       })     
    
     useEffect(() => {
      if (!window){
        return
      }
      return setScreenWidth(window.innerWidth)     
    })

     //resets timeoutInstance to 25 on first render only
     useEffect(() => {
      timeoutInstance.setTimeout = 25;
     }, [])

     //this updates the colour of one of the seven individual sections of the elephant,
     //all of which are stored in state
     const updateState = (section: number, color: string) => {
      setSectionColours(prevState => ({
        ...prevState,
        [`section${section}`]: color,
      }));
    }

    //let timeout = 25;


    //this handles the actual animation. It effects a mexican wave style swoosh of a new colour
    //for each section of the elephant, each new colour added 25 milliseconds after the previous
     const dominoFinish = useCallback(() => {
     // const dominoFinish = () => {

      //array of numbers of the different sections of the elephant for the animation logic to loop
      //over
      const arrayToConsume = [1,2,3,4,5,6,7]

      //if prop startWhite is true then first colour is white, else second colour is white
      //and their opposites are a randomly selected colour
      const firstColour = startWhite ? "white" : colourManagementInstance.objectColourSelector();
      const secondColour = startWhite ? colourManagementInstance.objectColourSelector() : "white";

      //this implements the first mexican wave of colour, which goes in one direction
      arrayToConsume.forEach((x) => {
        setTimeout(() => {
          return updateState(x, firstColour)
        }, timeoutInstance.timeoutUpdate(25))
        //}, timeout = timeout + 25;
      })

      console.log('current value timeoutInstance')
      console.log(timeoutInstance.getTimeout)
      //this delays the transformation of the elephant into the second colour
      timeoutInstance.incrementTimeout = 2000;
      //timeout = timeout + 2000

      //this implements the second mexican wave of colour, in the opposite direction to the first
      for (let y = arrayToConsume.length; y > 0; y--){
        setTimeout(() => {
          return updateState(y, secondColour)
        }, timeoutInstance.timeoutUpdate(25))
      }

      //another delay
      timeoutInstance.incrementTimeout = 2000;
      //timeout = timeout + 2000

     }, [])
    //}
//, [colourManagementInstance, startWhite, timeoutInstance]
     //this calls dominoFinish, initiating the animation
     useEffect(() => {

      //defines variable constant which is incremented by one each time with each call of 
      //domino finish via the interval function below. Once it reaches 1000 the interval
      //is stopped. At this stage, the exact time in which each tile of the elephant will change
      //colour has been calculated up to half an hour ahead, so it's important to stop it or else
      //computing power will be wasted planning days or even weeks of slide colour change times
      let maxInterval = 0;
      const intervalRoutine = setInterval(() => {
        dominoFinish()
        //timeoutInstance.setTimeout = 2500
        //timeout
        console.log('timeout val from w/in interval function')
        console.log(timeoutInstance.getTimeout)
        //see notes on terminating interval above
        if (++maxInterval > 1000){
          window.clearInterval(intervalRoutine)
        }
      }, 1)

     }, [])
     //, [dominoFinish, timeoutInstance]

  //In the below, note how the actual elephant is only rendered once screenWidth has been calculated
  return (
    <>    
    {
      screenWidth ?
      <IndividualElephantSvg
        sectionColours={sectionColours}
        screenWidth={screenWidth}
        sizeModifier={sizeModifier}        
      ></IndividualElephantSvg>
      :
      null

    }    
    </>
  )
};

export default IndividualElephantContainer;