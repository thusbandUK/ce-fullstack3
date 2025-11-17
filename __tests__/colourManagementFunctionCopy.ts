type ColourManagement = {
    objectRemainingColours: string[],
    objectUsedColours: string[],
    objectColourSelector: () => string
   }

export const colourManagement: ColourManagement = {
    objectRemainingColours: ['#F28972', '#F2C48D', '#D98FBF', '#8268A6'],
    objectUsedColours: [],
    objectColourSelector(){
      if (this.objectRemainingColours.length === 0){
        this.objectRemainingColours = this.objectUsedColours;
        this.objectUsedColours = [];
      }  
      const index = Math.floor(Math.random() * this.objectRemainingColours.length);      
      const selectedColour = this.objectRemainingColours.splice(index, 1)[0];
      this.objectUsedColours.push(selectedColour);
      return selectedColour;
    }
   }