import React from 'react';
import { ResponseAssessmentContext } from './flashcards';
import { useContext } from "react";
import { assessedResponse, FlashcardData } from '@/app/lib/definitions';
import DOMPurify from "isomorphic-dompurify";
import ArrowCommand from './arrowCommand';

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

    //flex-col justify-between 
    /*
    <div className="grid grid-cols-6 w-100 mx-auto mt-16">
        <div className="col-start-1 rounded-lg col-span-6 flex" style={{border: 'black solid 1px'}}>
    */
    return (
        <div className="w-full md:w-4/5 flex flex-col px-2 pb-4 mx-auto grid grid-cols-6">
          <div className="border-2 w-full flex flex-col border-black rounded-lg px-5 py-1 m-auto col-start-1 col-span-6">
            <div className="spacer"></div>
            <h1
              dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question)}}
              className="text-center"
            ></h1>
            <div className="spacer"></div>
          </div>
            
            { (writtenStage === "response") ?
                
                  <>
                    <div className="col-start-1 col-span-6 md:col-span-4 w-full">

                    <textarea 
                      id="response"
                      onChange={handleResponseChange}
                      name="response"
                      rows={5} cols={33}
                      className="border-2 border-black rounded-lg p-5 w-full h-full"
                      placeholder="Write your answer here..."
                    >
                
                    </textarea>
                    </div>
                    <div className="col-start-1 md:col-start-5 col-span-6 md:col-span-2 border-2 border-black rounded-lg flex flex-col justify-end">
                      <button  onClick={submitResponse}>
                    <label htmlFor="response" >
                      <div className="m-5">
                      <ArrowCommand 
                        borderGray={false}
                        command="SUBMIT"
                      />   
                      </div>                   
                    </label>
                    </button>
                    </div>

                    
                  </>
                
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
                  const arrayIndex = checklist.findIndex((item: string) => item === x);                  
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

//<button onClick={submitResponse}>Submit</button>