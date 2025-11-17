"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { ColourManagementClass, sequenceRandomiser } from '../../animation/animationFunctions';
import IndividualElephantSvg from '../../animation/individualElephantSvg';

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

const CELogoAnimation: React.FC<HomeProps> = () => {

     const backgroundColour = "white";
     const colourManagementInstance = new ColourManagementClass;
     const [sectionColours, setSectionColours] = useState<ColorScheme>({
      section1: backgroundColour,
      section2: backgroundColour,
      section3: backgroundColour,
      section4: backgroundColour,
      section5: backgroundColour,
      section6: backgroundColour,
      section7: backgroundColour
     })
     const [ screenWidth, setScreenWidth ] = useState<number>(0)

     //updates state with the screen width. note, the elephant doesn't render until
     //the screen width has been set
     useEffect(() => {
      setScreenWidth(window.innerWidth);
     }, [])
/* This is very important. It looks after various variables, object-oriented style. Notes on each
 can be found embedded within*/
const variableManager = {
  //this effectively sets the time at which the first colour change called by dominoFinish occurs
  //(the second phase, hence not zero)
  timeout: 1800,
  //this is used by flickeringAnimation to call specific times listed in timeoutArray below
  timeoutIndex: 0,
  //this dictates the times at which the tiles blink on and off in flickeringAnimation
  //it's intended to mimic the flickering on of a neon strip light
  timeoutArray: [0,500,700,600,800, 1200, 1350, 1200, 1350, 2500, 2700, 2600, 2800, 2700, 2900],
  //this sets the final colour adopted by all seven slides of the elephant by the end of the animation sequence
  finalColour: colourManagementInstance.objectColourSelector(),
  //this is used by dominoFinish, effectively changing the direction of the "Mexican wave" that changes
  //all the tiles of the elephant to the final colour
  randomSequence: sequenceRandomiser(),
  //this is used by the recursive flickeringAnimation function. As the function loops, it chooses four
  //numbers of random (popping them from the array with each selection) to blink on and off before
  //the cycle is terminated
  numberArray: [1,2,3,4,5,6,7],
  get getTimeout(){
    return this.timeout;
  },
  get getTimeoutIndex(){
    return this.timeoutIndex
  },
  get getTimeoutArray(){
    return this.timeoutArray
  },
  get getFinalColour(){
    return this.finalColour
  },
  get getRandomSequence(){
    return this.randomSequence
  },
  get getNumberArray(){
    return this.numberArray
  },
  set setTimeout(number: number){
    this.timeout = number;
  },
  set incrementTimeout(number: number){
    this.timeout = this.timeout + number;
  },
  set setTimeoutIndex(number: number){
    this.timeoutIndex = number;
  },
  set incrementTimeoutIndex(number: number){
    this.timeoutIndex = this.timeoutIndex + number
  },
  //both the below methods replace the previous logic, which used let variables with a 
  //var = var + increment approach, automatically incrementing the running total while
  //also passing the number to the setTimeout function
  incrementAndReturnTimeout(number: number){
    this.incrementTimeout = number
    return this.timeout
  },
  incrementAndReturnTimeoutIndex(number: number){
    this.incrementTimeoutIndex = number
    return this.timeoutIndex
  },
  //see note on numberArray above
  randomSelectionFromNumberArray(){
    const randomPosition = Math.floor(Math.random() * this.getNumberArray.length);
    return this.getNumberArray.splice(randomPosition,1)[0];
  }
}

//called from within flickeringAnimation and dominoFinish, it just updates the colour
//of one of the numbered panels (1 to 7) of the elephant
const updateState = (section: number, color: string) => {
  setSectionColours(prevState => ({
    ...prevState,
    [`section${section}`]: color, // Updating key1's value
  }));
}

/*
flickeringAnimation causes two pairs of slides each to blink on and off with different
colours randomly selected from the four colours in the theme.
It's a recursive function which alters various different values in the above object variableManager,
including timeoutIndex, which is incremented by 1 twice for each blinking on and off of a panel, so
that the recursive function is stopped after four panels have blinked on and off
*/

const flickeringAnimation = useCallback(() => {
  
  if (variableManager.getTimeoutIndex >= 8){
    return
  }
  if (variableManager.getNumberArray.length === 0){
    return}

    const selections = {
        section: 0,
        color: ""
    }

    selections.section = variableManager.randomSelectionFromNumberArray();

    selections.color = colourManagementInstance.objectColourSelector();

    setTimeout(() => {
      return updateState(selections.section, selections.color);
    }, variableManager.getTimeoutArray[variableManager.incrementAndReturnTimeoutIndex(1)])

    setTimeout(() => {
      return updateState(selections.section, backgroundColour);
  }, variableManager.getTimeoutArray[variableManager.incrementAndReturnTimeoutIndex(1)])

    flickeringAnimation()
}, [])
  
  //this does the Mexican wave change of colour of all seven tiles into the final colour (unlike
    //in individualElephant, it only does that in one direction)
    //for each section of the elephant, each new colour added 25 milliseconds after the previous
    //the colour is selected at random when the variablesManager object is instantiated
    const dominoFinish = useCallback(() => {
      variableManager.getRandomSequence.forEach((x) => {
        setTimeout(() => {
          return updateState(x, variableManager.getFinalColour)
        }, variableManager.incrementAndReturnTimeout(25)
      )})
     }, [])

     //triggers animation sequence
     useEffect(() => {
      flickeringAnimation();
      dominoFinish();
     }, [dominoFinish, flickeringAnimation])

     return (
      <>
        { 
          screenWidth ? 
            <IndividualElephantSvg
              sectionColours={sectionColours}
              screenWidth={screenWidth}
              sizeModifier={0.3}
            />
          :
          null
        }
      </>
     )
};

export default CELogoAnimation;