import React from 'react';
import { ResponseAssessmentContext } from './flashcards';
import { useContext, useRef, useState } from "react";
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

    //variables used to resize input box to fill available screen space
    const [ height, setHeight ] = useState<number>(167)

    //this creates an empty div object, which can then be passed to the various useRef variables below
    const initialDivElValue = document.createElement('div');

    const h1Ref = useRef<HTMLDivElement>(initialDivElValue);
    const submitBoxRef = useRef<HTMLDivElement>(initialDivElValue);

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

    //the above refs (from useRef) work best once this component has rendered, so they are passed
    //as props to the below InputBox component, within which, their client heights can be ascertained
    //and combined to calculate the remaining height for the InputBox to occupy. This information is
    //then passed back via props and this function, which simply sets height with the calculated number
    const handleHeight = (newHeight: number) => {
      setHeight(newHeight)
    }

    //updates checkbox for corresponding checklist item in ResponseAssessmentContext
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {

      //detects whether the box is checked or unchecked
      const checked: boolean = event.target.checked;
     
      //crosses or uncrosses the checklist point in the correct location in the ResponseAssessmentContext
      return responseAssessment[index].checkedPoints[event.target.value as keyof assessedResponse["checkedPoints"]] = checked;
    }

    return (
        <div className="w-full md:w-4/5 flex flex-col pb-4 mx-auto grid grid-cols-6">
          <div ref={h1Ref} className="border-2 w-full flex flex-col border-black rounded-lg px-5 py-1 m-auto col-start-1 col-span-6">
            <div className="spacer"></div>
            <h1
              dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question)}}
              className="md:text-center"
            ></h1>
            <div className="spacer"></div>
          </div>

          {
            (writtenStage === "response") ?

            <>
              <div style={{height: height}} className="col-start-1 col-span-6 md:col-span-4 w-full">
                <InputBox
                  h1Ref={h1Ref}
                  submitBoxRef={submitBoxRef}
                  handleResponseChange={handleResponseChange}
                  handleHeight={handleHeight}
                />
              </div>
              <div ref={submitBoxRef} className="col-start-1 md:col-start-5 col-span-6 md:col-span-2 border-2 border-black rounded-lg flex flex-col justify-end">
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