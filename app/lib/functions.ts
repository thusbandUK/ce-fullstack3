import { QuestionsData } from "./definitions";

//returns string, receives an array of numbers in string format, returns a string of sql.query parameters
//eg input ["5","8","9"] returns '$1, $2, $3'
export const queryMaker = (listOfIds: string[]) => {
    let outputArray: string[] = [];
    for (let x = 0; x < (listOfIds.length - 1); x++){
        outputArray.push(`$${(x + 1).toString()}, `)
    }
    //last value pushed to array omits ', '
    outputArray.push(`$${listOfIds.length}`);
    return outputArray.join("");
}

//takes an array of objects and returns an array of numbers in string format
export const questionSetSimplifiedArray = (questionSetArrayOfObjects: QuestionsData[]) => {
    const questionSetArray = questionSetArrayOfObjects.map((x: QuestionsData) => {
        return x.question.toString();
    })
    return questionSetArray;
}

//takes an array of numbers in string format and selects 15 at random
export const randomSelectionOfFifteen = (inputArray: string[]) => {
    if (inputArray.length <= 15){        
        return inputArray;
    }
    let modifiedInputArray = inputArray;
    let outputArray: string[] = [];
    for (let x = 0; x < 15; x++){
        const index = Math.floor(Math.random() * modifiedInputArray.length);
        outputArray.push(modifiedInputArray[index]);
        modifiedInputArray.splice(index, 1);
    }
    return outputArray;
}