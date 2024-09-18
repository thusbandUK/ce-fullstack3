import React from 'react';
import { ResponseAssessmentContext } from './flashcards';
import { useContext } from "react";
import { assessedResponse, Flashcard } from '@/app/lib/definitions';

const WrittenFlashcard = (props: any) => {    

  /*
  {
  question, 
  //questionId,
  ...props

}: {
  question: Flashcard,
  questionId: number

}
  */
  //question
//props: any
    const {name, checklist, question, id: questionId} = props.question;
    //const {name, checklist,  id: questionId} = props.question;

    const responseAssessment = useContext(ResponseAssessmentContext);    
   
    const index: number = responseAssessment.findIndex((x: assessedResponse) => {
        return x.id === questionId;
    })    

    const key = (arrayIndex: number) => {
      switch (arrayIndex){
        case 0:
          return "W";          
        case 1: 
          return "X";          
        case 2:
          return "Y";          
        case 3:
          return "Z";        
      }
      return
    }
    
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
            
            { (props.writtenStage === "response") ?
                
                  <div className="d-flex flex-column">
                    <label htmlFor="response">Write your answer:</label>

                    <textarea id="response" onChange={handleResponseChange} name="response" rows={5} cols={33}>
                
                    </textarea>
                    <button onClick={props.submitResponse}>Submit</button>
                  </div>
                
            : null}
            { (props.writtenStage === "feedback") ?
              <div>
            
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
              
                <button onClick={props.submitChecklist}>Submit</button>
              </div>                           
              
            : null
            }
        </div>
    )
}

export default WrittenFlashcard;