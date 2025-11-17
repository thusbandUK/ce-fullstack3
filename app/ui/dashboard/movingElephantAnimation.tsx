/*"use client"

import React, { useState, useEffect, useCallback } from 'react';
import MovingElephantSVG from './movingElephantSVG';
//import { anchorsInterface } from '@/app/page';

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
/*
interface HomeProps {
    anchors: anchorsInterface;
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

const MovingElephantAnimation: React.FC<HomeProps> = ({
  anchors
}
:
{
  anchors: anchorsInterface
}) => {
//  const MovingElephantAnimation: React.FC = (
    
  //) => {
     
     const backgroundColour = "white";

     const [colourPalette, setColourPalette] = useState<string[]>(['#f28972', '#F2C48D', '#D98FBF', '#8268A6']);
     const [currentColour, setCurrentColour] = useState<string>(colourPalette[Math.floor(Math.random() * 4)]);     
     const [sectionColours, setSectionColours] = useState<DoubleColorScheme>({
      elephantA:
      {
        section1: currentColour,
        section2: currentColour,
        section3: currentColour,
        section4: currentColour,
        section5: currentColour,
        section6: currentColour,
        section7: currentColour
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
     const [screenHeight, setScreenHeight] = useState<number>(400)

     //elephantA var lists the remaining slides for which to change colours. The animating functions
     //sequentially empty the A var, transferring the values to the B var. Once the A var is emptied
     //the corresponding recursive function emptyElephantA stops and the function EmptyElephantB
     //starts emptying the B var
     const elephantARemaining: number[] = [1,2,3,4,5,6,7]

     const elephantBRemaining: number[] = []
    
     //similar principle as above, remainingColours is emptied as usedColours is filled, once the
     //former is emptied, it is filled with the usedColours values and usedColours is emptied
     let remainingColours: string[] = ['#F28972', '#F2C48D', '#D98FBF', '#8268A6'];
     
     let usedColours: string[] = [];
    
     //this is updated with the returned value of the below function colourSelector, which is called
     //on the first pass through each of the recursive functions, emptyElephantA and ...B
     let nextColour = "";

     //this updates the state in which the current colours of each section of elephants A and B
     //are stored
     const updateState = (slide: number, elephant: string) => {
     
       setSectionColours(prevState => ({
         ...prevState,
         elephantA: {
           ...prevState.elephantA,
           [`section${slide}`]: elephant === "A" ? "white" : nextColour
         },
         elephantB: {
           ...prevState.elephantB,
           [`section${slide}`]: elephant === "B" ? "white" : nextColour
         }
       }))
      
      return
     }

     //initial value for timeout. In order for the slides to change colour at different times,
     //successively higher values need to be passed to the setInterval functions called in the
     //recursive functions emptyElephant A and ...B. The timeout var below has an initial value
     //of 1500 and is increased by various amounts at various points of the process
     let timeout = 1500;

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

     const emptyElephantA = useCallback(() => {
       //updates colour in which to render next elephant on first pass through the recursive function
       if (elephantARemaining.length === 7){
         nextColour = colourSelector();
       }
       //terminates recursive function once all 7 slides have changed colour
       if (elephantARemaining.length === 0){
         //adds time gap before teleportation of next elephant
         timeout = timeout + 2000
         return;
       }

       //selects random slide to transfer between elephants
       const randomIndex = Math.floor(Math.random() * elephantARemaining.length)

       const randomSlideReference: number = elephantARemaining.splice(randomIndex, 1)[0]

       //updates elephantB array with random slide selection
       elephantBRemaining.push(randomSlideReference); 
 
       //updates colour of corresponding slide in both elephants via updateState function
       setTimeout(() => {  
         return updateState(randomSlideReference, "A")
       }, timeout = timeout + 100)

       //calls the function again to cycle through remaining slides of elephant A
       emptyElephantA()
     }, [])

     //this works exactly like emptyElephantA but refers to the opposite elephant throughout
     const emptyElephantB = useCallback(() => {
  
       if (elephantBRemaining.length === 7){    
         nextColour = colourSelector();
       }
       if (elephantBRemaining.length === 0){
         timeout = timeout + 2000
         return;
       }

       const randomIndex = Math.floor(Math.random() * elephantBRemaining.length)

       const randomSlideReference: number = elephantBRemaining.splice(randomIndex, 1)[0]

       elephantARemaining.push(randomSlideReference); 
 
       setTimeout(() => {  
         return updateState(randomSlideReference, "B")
       }, timeout = timeout + 100)

       emptyElephantB()
     }, [])

     //let screenHeight = 400;

     useEffect(() => {
      
       setInterval(() => {
         setScreenHeight(window.innerHeight);
         emptyElephantA()
         timeout = timeout + 1500;        
         emptyElephantB();
         timeout = 1500;        
       }, 3000)
     }, [emptyElephantA, emptyElephantB])

  return (
    <>
      <MovingElephantSVG
        sectionColours={sectionColours.elephantA}
        cssRef={anchors.elephantA}
        screenHeight={screenHeight}
      ></MovingElephantSVG>

      <MovingElephantSVG
        sectionColours={sectionColours.elephantB}
        cssRef={anchors.elephantB}
        screenHeight={screenHeight}
      ></MovingElephantSVG>
    </>
  )
};

export default MovingElephantAnimation;
*/