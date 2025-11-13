/*
Every instance of animated elephant needs to be able to cycle through the four available colours in a 
random sequence. The class below is a self-contained unit, the objectColourSelector (OCS) method of which
returns one of the four colours at random, in tandem with getters and setters which transfer the selected
colour from the options that remain for subsequent OCS method calls to the usedColours array. Once all
four colours have been used, the OCS method automatically transfers all four colours from used back to
remaining so the cycle can start again.
It's important to have a class so that every instance of the elephant can have its colour sequence
managed by its own instance, otherwise one function could be supplying several elephants at once such
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

    set resetRemainingColours(arrayOfColours: string[]){
        this.remainingColours = arrayOfColours;
    }

    set setUsedColours(colour: string){
        this.usedColours.push(colour)
    }

    resetUsedColours(){
        this.usedColours = []
    }

    objectColourSelector(){
        if (this.remainingColours.length === 0){
          this.resetRemainingColours = this.usedColours
          this.resetUsedColours
        }
        const colour = this.getColour
        this.setUsedColours = colour
        return colour;
      }
  };

export const TimeoutClass = class {
    timeoutValue: number
    constructor(){
        this.timeoutValue = 25;
    }

    get getTimeout(){
        return this.timeoutValue
    }

    set setTimeout(number: number){
        this.timeoutValue = number;
    }

    set incrementTimeout(number: number){
        const newValue = this.timeoutValue + number
        this.timeoutValue = newValue;
    }

    timeoutUpdate(increment: number){
        this.incrementTimeout = increment;
        return this.getTimeout;
    }
}