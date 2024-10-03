import React from 'react';
import { ResponseAssessmentContext } from './flashcards';
import { useContext } from "react";
import { assessedResponse, FlashcardData } from '@/app/lib/definitions';
import DOMPurify from "isomorphic-dompurify";

//takes the index position of the checklist array and converts it into a letter, to match the corresponding keys
    //in the assessedResponse checklist (in ResponseAssessmentContext)
    export const numericalIndexToLetter = (arrayIndex: number) => {
      switch (arrayIndex){
        case 0:
          return "W";          
        case 1: 
          return "X";          
        case 2:
          return "Y";          
        case 3:
          return "Z";
        default:
          return "W";
      }
      //return
    }

const WrittenFlashcard = (
  {
    oneFlashcardData,
    submitResponse,
    writtenStage,    
    submitChecklist
  }:
  {
    oneFlashcardData: FlashcardData,
    submitResponse: React.MouseEventHandler<HTMLButtonElement>,
    writtenStage: string,    
    submitChecklist: React.MouseEventHandler<HTMLButtonElement>
  }
) => {
  
    const {checklist, definition, question, id: questionId} = oneFlashcardData;    

    const responseAssessment = useContext(ResponseAssessmentContext);    
   
    //returns the index in the ResponseAssementContext of the question being answered
    const index: number = responseAssessment.findIndex((x: assessedResponse) => {
        return x.id === Number(questionId);
    })    

    //creates a copy of checklist but leaves out any entered as NULL
    const noNullItemsChecklist = checklist.filter((x) => {
      return x !== null;
    })

    
    
    //harvests answer written into the form field and dispatches it to ResponseAssessmentContext
    const handleResponseChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      return responseAssessment[index].response = event.target.value;
    }

    //updates checkbox for corresponding checklist item in ResponseAssessmentContext
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      
      //detects whether the box is checked or unchecked
      const checked: boolean = event.target.checked;
     
      //crosses or uncrosses the checklist point in the correct location in the ResponseAssessmentContext
      return responseAssessment[index].checkedPoints[event.target.value as keyof assessedResponse["checkedPoints"]] = checked;      
    }

    
    return (
        <div>
            <p>{question}</p> 
            
            { (writtenStage === "response") ?
                
                  <div className="d-flex flex-column">
                    <label htmlFor="response">Write your answer:</label>

                    <textarea id="response" onChange={handleResponseChange} name="response" rows={5} cols={33}>
                
                    </textarea>
                    <button onClick={submitResponse}>Submit</button>
                  </div>
                
            : null}
            { (writtenStage === "feedback") ?
              <div>
            
                <legend>Check the points you got right</legend>
                <h2>Model answer:</h2>
                <p
                  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(definition)}}
                ></p>
                <h2>Your answer:</h2>
                <p>{responseAssessment ? responseAssessment[index].response : null}</p>
              
                {noNullItemsChecklist.map((x: string) => {
                  let arrayIndex = checklist.findIndex((item: string) => item === x);                  
                  return (
                    <div key={arrayIndex}>
                      <input                        
                        onChange={handleCheckboxChange}
                        type="checkbox" 
                        id={`checkbox-${arrayIndex}`}                        
                        value={numericalIndexToLetter(arrayIndex)} 
                        name={`checkbox-${arrayIndex}`} />
                      <label 
                        htmlFor={`checkbox-${arrayIndex}`}
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(x)}}
                      ></label>
                    </div>      
                )})}              
              
                <button onClick={submitChecklist}>Submit</button>
              </div>                           
              
            : null
            }
        </div>
    )
}

export default WrittenFlashcard;