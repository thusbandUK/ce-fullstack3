import React from 'react';
import { ResponseAssessmentContext } from './flashcards';
import { useContext } from "react";
import { assessedResponse, FlashcardData } from '@/app/lib/definitions';
import DOMPurify from "isomorphic-dompurify";
import ArrowCommand from './arrowCommand';
import InputBox from './inputBox';

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
    }

const WrittenFlashcard = (
  {
    oneFlashcardData,
    submitResponse,
    writtenStage,
    submitChecklist,
    //handleMaxWritingMark
  }:
  {
    oneFlashcardData: FlashcardData,
    submitResponse: React.MouseEventHandler<HTMLButtonElement>,
    writtenStage: string,
    submitChecklist: React.MouseEventHandler<HTMLButtonElement>,
    //handleMaxWritingMark: (arg0: number) => void
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

    /*
    So, just as the above function filters out null entries, the below accesses the responseAssessment
    object and sets the checkedPoints value to false for any checkedPoints that do not have a null response

    This logic links with the following functions in the parent component 

    harvestAssessmentData (line c.93)[counts the maximum number of marks, counting only true or false values]
    handleWrittenClick (line c.227)[initiates the responseAssessmentContext]
    */
   
    checklist.forEach((x) => {
      if (x !== null){
        responseAssessment[index].checkedPoints[numericalIndexToLetter(checklist.indexOf(x)) as keyof assessedResponse["checkedPoints"]] = false;
      }
    })

    //handleMaxWritingMark(noNullItemsChecklist.length)
    
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
        <div className="w-full md:w-4/5 flex flex-col h-82-vh pb-4 mx-auto md:grid md:grid-cols-6">
          <div className="border-2 w-full flex flex-col border-black rounded-lg px-5 py-1 col-start-1 col-span-6">
            <div className="spacer"></div>
            <h1
              dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question)}}
              className="md:text-center"
            ></h1>
            <div className="spacer"></div>
          </div>

          {
            (writtenStage === "response") ?
            <div style={{flex: 1}} className="grow flex flex-col grow md:col-span-6 md:grid md:grid-cols-6 w-full">

            <>

              <div className="grow md:col-start-1 md:col-span-4">
                <InputBox
                  handleResponseChange={handleResponseChange}
                />
              </div>
              <div className="col-start-1 md:col-start-5 col-span-6 md:col-span-2 border-2 border-black rounded-lg flex flex-col justify-end">
                <button  onClick={submitResponse}>
                  <label htmlFor="response" className="cursor-pointer">
                    <div className="m-5">
                      <ArrowCommand
                        borderGray={false}
                        command="SUBMIT"
                        disabled={false}
                      />
                    </div>
                  </label>
                </button>
              </div>
            </>
            </div>

            : null
          }

          { (writtenStage === "feedback") ?
            <>
              <div className="border-2 border-black rounded-lg col-start-1 col-span-6 w-full p-5 md:p-10">
                <h2 className="text-xl md:text-4xl">Model answer:</h2>
                <p
                  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(definition)}}
                  className="pt-5"
                ></p>
              </div>
              <div className="border-2 border-black rounded-lg col-start-1 col-span-6 md:col-span-3 w-full p-5 md:p-10">
                <h2 className="text-xl md:text-4xl">Your answer:</h2>
                {
                  responseAssessment[index].response ?
                  <p className="pt-5 italic">&quot;{responseAssessment[index].response}&quot;</p>

                  : null
                }
              </div>
              <div className="border-2 border-black rounded-lg col-start-1 md:col-start-4 col-span-6 md:col-span-3 w-full p-5 md:p-10">

                {
                  noNullItemsChecklist.map((x: string) => {
                    const arrayIndex = checklist.findIndex((item: string) => item === x);
                    return (
                      <div key={arrayIndex} className="flex">
                        <label
                          htmlFor={`checkbox-${arrayIndex}`}
                          className="label items-start"
                        >
                          <input
                            onChange={handleCheckboxChange}
                            type="checkbox"
                            id={`checkbox-${arrayIndex}`}
                            value={numericalIndexToLetter(arrayIndex)}
                            name={`checkbox-${arrayIndex}`}
                            className="mt-1 me-1 bg-elephant-violet"
                          />
                          <p
                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(x)}}
                            className="label-text text-black text-md"
                          ></p>
                        </label>
                      </div>
                    )
                  }
                )}

                <button  onClick={submitChecklist}>
                  <label htmlFor="response" className="cursor-pointer">
                    <div className="mt-5">
                      <ArrowCommand
                        borderGray={false}
                        command="SUBMIT"
                        disabled={false}
                      />
                    </div>
                  </label>
                </button>
              </div>
            </>
            : null
          }
        </div>
      )
}

export default WrittenFlashcard;