import React, { useState, useEffect } from 'react';
import { checkMarkingPoint, logQuestion, enterResponse } from './writtenFlashcardSlice';
//import { useSelector, useDispatch } from 'react-redux';
import { ResponseAssessmentContext } from './flashcards';
import { useContext } from "react";
import { assessedResponse } from '@/app/lib/definitions';

const WrittenFlashcard = (props: any) => {

    //const response = useSelector(state => state.flashcard[props.questionId]);

    const {name, checklist, question, id: questionId} = props.question;

    const responseAssessment = useContext(ResponseAssessmentContext);

    /*let index: number = -1;

    if (responseAssessment){
      const index: number = responseAssessment?.findIndex((x: assessedResponse) => {
        return x.id = questionId;
      })
    } */
   
    const index: number = responseAssessment?.findIndex((x: assessedResponse) => {
        return x.id = questionId;
    })

    const key = (arrayIndex: number) => {
      switch (arrayIndex){
        case 0:
          return "W";
          break;
        case 1: 
          return "X";
          break;
        case 2:
          return "Y";
          break;
        case 3:
          return "Z";
          break
        
      }
    }
    //console.log('this might be the responseassessmentcontext');
    //console.log(responseAssessment);

    //responseAssessment[0].response = "Hello jiminy!";

    //console.log(responseAssessment[0].response)
    
    //creates an object for the current question (it's configured to overwrite if it gets called twice)
    //into which the user's assessment data and the user's answer, will be written
    /*useEffect(() => {
      //maps checklist options and creates an array of objects, including the marking point criteria, which defaults to false
      let checklistArray = checklist.map((x) => {
        return {markingPoint: x, checked: false};
      })
      //dispatches checklistArray in object to Redux state, along with the question id, the question number and a space for the
      //user's response which defaults to null
      dispatch(logQuestion({questionId: props.questionId, question: question, response: "", checklist: checklistArray}));
    }, [props.questionId])
*/
    //harvests answer written into the form field and dispatches it to ResponseAssessmentContext
    const handleResponseChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {      
      //if (!responseAssessment){
        //return
      //}      
      responseAssessment[index].response = event.target.value;
    }  

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       
      //harvests id which is a string that ends in a number, taken from the key which counts from 0 upwards and hence
      //replicates sequence of marking points in redux state checklist array
      //const id = event.target.id;
      //harvests the string-format number from the id and converts it into a number
      //const index = Number(id.charAt(id.length - 1));
      
      //detects whether the box is checked or unchecked, returns Boolean
      const checked: boolean = event.target.checked;
            
      //initiates a variable which refers to the object of checked points in the parent assessedResponse object for the
      //question being answered
      //let checklistObject = responseAssessment[index].checkedPoints;

      //defines a checklistKey type for use with the object access in the line above
      //type ChecklistKey = assessedResponse["checkedPoints"];

      
      //checklistObject[event.target.value as keyof ChecklistKey] = checked;
      //crosses or uncrosses the checklist point in the correct location in the ResponseAssessmentContext
      responseAssessment[index].checkedPoints[event.target.value as keyof assessedResponse["checkedPoints"]] = checked;
      console.log(responseAssessment);
    }

    
    return (
        <div>
            <p>{question}</p> 
            
            { (props.writtenStage === "response") ?
                <form onSubmit={props.submitResponse}>
                  <div className="d-flex flex-column">
                    <label htmlFor="response">Write your answer:</label>

                    <textarea id="response" onChange={handleResponseChange} name="response" rows={5} cols={33}>
                
                    </textarea>
                    <button type="submit">Submit</button>
                  </div>
                </form>
            : null}
            { (props.writtenStage === "feedback") ?
            
            <form onSubmit={props.submitChecklist}>
              <fieldset>
                <legend>Check the points you got right</legend>
                <p>{responseAssessment ? responseAssessment[index].response : null}</p>
              
                {checklist.map((x: string) => {
                  let arrayIndex = checklist.findIndex((item: string) => item === x);                  
                  return (
                    <div key={key(arrayIndex)}>
                      <input                        
                        onChange={handleCheckboxChange}
                        type="checkbox" 
                        id={`checkbox-${key}`}                        
                        value={key(arrayIndex)} 
                        name={`checkbox-${key}`} />
                      <label htmlFor={`checkbox-${key}`}>{x}</label>
                    </div>      
                )})}
              
              </fieldset>
              <button type="submit">Submit</button>
            </form>               
              
            : null
            }{/**/}
        </div>
    )

}

export default WrittenFlashcard;

/*

<fieldset>
                  <legend>Choose your monster's features:</legend>

                    <div>
                      <input type="checkbox" id="scales" name="scales" checked />
                      <label for="scales">Scales</label>
                    </div>

                    <div>
                      <input type="checkbox" id="horns" name="horns" />
                      <label for="horns">Horns</label>
                    </div>
                </fieldset>
*/