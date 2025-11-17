import { FlashcardData, QuestionsData } from "./definitions";

//takes an array of strings and returns an array containing the same values but in a different sequence

export const shuffle = (array: string[]) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  };

  /*
Since there might not be a location in any given url, the param often comes back as undefined,
but TypeScript expects it often also to be null, so this effectively stringifies location, returning
an empty string "" if the param is passed as either null or undefined. This then enables .length === 0
logic to be used effectively to ignore the location param when no location has been specified
*/

export const locationParser = (location: string | null | undefined) => {
    if ((location !== undefined) && (location !== null) && (typeof location !== 'string')){
        return "";
    }
    if ((location === undefined) || (location === null)){
        return "";
    } else {
        return location;
    }
}

export type paramsObject = {
    again: string;
}

export const renewDeleteMessage = (params: paramsObject) => {

    let message: string = "";
    const filler: string = "Press the button to send a new one";
    if (params.again){
        switch (params.again){
          case "none":
          message = `Sorry you have not received any message. ${filler}.`
          break;
          case "expired":
          message = `Looks like your link expired. ${filler} and make sure to click the link within one hour.`
          break;
          case "corrupted":
          message = `Looks like there's something wrong with your link. Curious! ${filler}.`
          break;
          case "already":
          message = `We already have a record of you requesting an email to delete your account. ${filler}.`
          break;
          case "wrong":
          message = `The credentials you have supplied do not match those we have stored. Curious! ${filler}.`
          default:
          message = `Not sure what has happened but press the button if you need a new link to delete your account.`
          break;

        }
      } else {
        message = `Not sure what has happened but press the button if you need a new link to delete your account.`
      }
      return message
}
//takes an array of objects and returns an array of numbers in string format
/*
export type QuestionsData = {
  id: number;
  topics_id: number;
  question: number;

}

export const questionSetSimplifiedArray = (questionSetArrayOfObjects: QuestionsData[]) => {
    const questionSetArray = questionSetArrayOfObjects.map((x: QuestionsData) => {
        return x.question.toString();
    })
    return questionSetArray;
}
*/

/*
//takes an array of numbers in string format and selects 15 at random
export const randomSelectionOfFifteen = (inputArray: string[]) => {
    //edge case - if there are fewer than 15 id values passed to the function, the below if clause
    //repeats different values in the argument array at random to make an array with 15 id values
    //all from values pass in the inputArray
    if (inputArray.length <= 15){
        const modifiedInputArray = inputArray;
        const shortfall: number = (15 - inputArray.length);
        for (let y = 0; y < shortfall; y++){
            const index = Math.floor(Math.random() * inputArray.length);
            modifiedInputArray.push(inputArray[index]);
        }
        return modifiedInputArray;
    }
    const modifiedInputArray = inputArray;
    const outputArray: string[] = [];
    for (let x = 0; x < 15; x++){
        const index = Math.floor(Math.random() * modifiedInputArray.length);
        outputArray.push(modifiedInputArray[index]);
        modifiedInputArray.splice(index, 1);
    }
    return outputArray;
}
*/


/*
//returns string, receives an array of numbers in string format, returns a string of sql.query parameters
//eg input ["5","8","9"] returns '$1, $2, $3'
export const queryMaker = (listOfIds: string[]) => {
    const outputArray: string[] = [];
    for (let x = 0; x < (listOfIds.length - 1); x++){
        outputArray.push(`$${(x + 1).toString()}, `)
    }
    //last value pushed to array omits ', '
    outputArray.push(`$${listOfIds.length}`);
    return outputArray.join("");
}
*/