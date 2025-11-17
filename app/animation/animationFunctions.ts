/*
Every instance of animated elephant needs to be able to cycle through the four available colours in a 
random sequence. The class below is a self-contained unit, the objectColourSelector (OCS) method of which
returns one of the four colours at random, in tandem with getters and setters which transfer the selected
colour from the options that remain for subsequent OCS method calls to the usedColours array. Once all
four colours have been used, the OCS method automatically transfers all four colours from used back to
remaining so the cycle can start again.
It's important to have a class so that every instance of the elephant can have its colour sequence
managed by its own class instance, otherwise one function could be supplying several elephants at once such
that they don't cycle through all four colours and or may have the same colour at the same time.
*/

export const ColourManagementClass = class {
    remainingColours: string[];
    usedColours: string[];
    constructor() {
      this.remainingColours = ['#F28972', '#F2C48D', '#D98FBF', '#8268A6'];
      this.usedColours = [];
    }

    get getColour(){
      const index = Math.floor(Math.random() * this.remainingColours.length);
      return this.remainingColours.splice(index, 1)[0];
    }

    get getUsedColours(){
        return this.usedColours
    }

    get getRemainingColours(){
        return this.remainingColours
    }

    set resetRemainingColours(arrayOfColours: string[]){
        this.remainingColours = arrayOfColours;
    }

    set setUsedColours(colour: string){
        this.usedColours.push(colour)
    }

    set assignUsedColoursValue(array: string[]){
        this.usedColours = array
    }

    resetUsedColours(){
        this.assignUsedColoursValue = []
    }

    objectColourSelector(){
        if (this.remainingColours.length === 0){
          const replacementArray = this.getUsedColours
          this.resetRemainingColours = replacementArray          
          this.resetUsedColours()
        }
        const colour = this.getColour
        this.setUsedColours = colour
        return colour;
      }
  };

  /* Like the above, it's useful for every instance of the elephant to have its own TimeoutObject,
  which will enable the running total of timeout (the value of which is passed to the two interval
    functions) to be held in an object designated to that elephant, rather than as a global variable
  )

   */
export const TimeoutClass = class {
    timeoutValue: number
    constructor(){
        this.timeoutValue = 25;
    }

    get getTimeout(){
        return this.timeoutValue
    }

    //changes the current timeoutValue to the number passed
    set setTimeout(number: number){
        this.timeoutValue = number;
    }

    //increments existing timeoutValue by the number passed
    set incrementTimeout(number: number){
        const newValue = this.timeoutValue + number
        this.timeoutValue = newValue;
    }

    //increments timeoutValue by the number passed AND returns the updated value
    timeoutUpdate(increment: number){
        this.incrementTimeout = increment;
        return this.getTimeout;
    }
}

//this returns an array containing the numbers 1 to 7 in either ascending or descending order
//at random. Used by domino finish in landing page animation so that the Mexican wave colours
//the elephant in one of two opposite directions at random
export const sequenceRandomiser = () => {
    const randomNumber = Math.floor(Math.random() * 2);
    if (randomNumber === 0){
      return [1,2,3,4,5,6,7];
    } else {
      return [7,6,5,4,3,2,1];
    }
}