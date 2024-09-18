"use client";

import { fetchFlashcards } from "@/app/lib/data"
import DOMPurify from "isomorphic-dompurify";
import IndividualFlashcard from "./individual-flashcard/IndividualFlashcard";
import { createContext, MouseEventHandler, useContext, useState } from 'react';
import { FlashcardData } from "@/app/lib/definitions";
//import { ThemeContext } from "@/app/flashcards/page";
import MultipleChoiceQuestion from "./multipleChoiceQuestion";
import Response from "./response";
import { HTMLElementEvent, customMouseEventHandler, assessedResponse } from "@/app/lib/definitions";
import WrittenFlashcard from "./writtenFlashcard";

export const ResponseAssessmentContext = createContext<assessedResponse[]>([]);

export default function FlashcardPresentation({allFlashcardsData}: {allFlashcardsData: FlashcardData[]}) {

    //below two variables assign the number of the question...
    //for MCQ
    const [flashcard, setFlashcard] = useState<number>(-1);
    //for written response
    const [writtenFlashcard, setWrittenFlashcard] = useState<number>(-1);
    //this sets the feedback response given by the app to the user, once they have completed everything
    const [response, setResponse] = useState<string>("");
    //this stores the question numbers of correctly answered multiple choice questions
    const [correctlyAnsweredQuestions, setCorrectlyAnsweredQuestions] = useState<number[]>([]);
    //this stores the question numbers of questions answered with a written response
    const [answeredWrittenQuestions, setAnsweredWrittenQuestions] = useState<number[]>([]);
    //this counts the number of attempts required by the user to answer every multiple choice question correctly
    const [count, setCount] = useState(1);
    //this stores the three most recently attempted questions that the user got wrong (see queueQuestion function below)
    const [recentQuestions, setRecentQuestions] = useState<number[]>([]);
    //this stores the time (in milliseconds) at which the user starts
    const [startTime, setStartTime] = useState<number>();
    //this stores the question numbers of all the questions loaded up from the data source
    const [completeSet, setCompleteSet] = useState([0,1,2,3,4,5,6,7,8,9])
    //OBSOLETE? intended to store the responses to the written response questions
    const [enteredValue, setEnteredValue] = useState(null);
    //this stores the stage for the written response. It is toggled between "response", when user enters response
    //and "feedback", when user checks off their correct answers
    const [writtenStage, setWrittenStage] = useState("response");
    //OBSOLETE? intended to store the user's written response, but now logged in Redux state
    const [writtenResponse, setWrittenResponse] = useState<string | null>(null);
    //state management for written responses and checklist of points made (assessment data)
    const [responseAssessment, setResponseAssessment] = useState<assessedResponse[]>([]);
    

    //console.log(writtenFlashcard);

    const assessmentData: string[] = [];

    const harvestAssessmentData = (data: string[]) => {
        return 'harvested data';
    }
    /*
    Ask question initiates a set of questions, it will work through all of the questions in the stated array
    */

    function askQuestion(){
      //Creates an iterable array of the keys for the different flashcards in the object
      //correctly answered questions will be successively removed until the array is empty
      let completeQuestionSet = completeSet;
      //creates an array of the questions yet to be answered correctly
      let remainingQuestions: number[] = [];
      //filters the correctlyAnsweredQuestions state array and pushes any questions yet to be correctly answered to 
      //the remaining questions array
      completeQuestionSet.forEach((x: number)=>{
          if (!correctlyAnsweredQuestions.includes(x)){
              return remainingQuestions.push(x);
          }
      })
      //if there are no remaining questions, the time to complete the set is computed and delivered as part of a success message
      if (remainingQuestions.length === 0){
          const finishingTime = Date.now();
          const timeElapsed = (finishingTime - startTime)/1000;
          setResponse(`Great job! 10 questions answered correctly in ${count} attempts and in ${timeElapsed} seconds. Woop!`);
          setFlashcard(-1);
          return;
          //return askWrittenResponseQuestion();
      }
      //if the number of recently answered questions is greater than or equal to the number or remaining questions, the question
      //at the front of the recentQuestions queue is assigned
      if (remainingQuestions.length <= recentQuestions.length){
          let updatedRecentQuestions: number[] = recentQuestions;
          //come back and sort out the any, should be number but that wasn't accepted
          const selectedQuestion: any = updatedRecentQuestions.shift();
          setRecentQuestions(updatedRecentQuestions);
          setFlashcard(selectedQuestion);
          return //setCurrentQuestion(flashcards[flashcard]);
      }
      //if more questions remain than are stored in the recently answered queue, the remaining questions are filtered to remove
      //any of those in the recently answered array, to ensure that the same question is only answered twice in a row if it is the
      //last remaining question
      let remainingNonRecentQuestions = remainingQuestions.filter((question)=> {
          return !recentQuestions.includes(question);
      })
      //a random number is generated to select at random from one of the remainingNonRecent questions
      let randomNumber = Math.floor(Math.random() * remainingNonRecentQuestions.length);
      let selectedCard = remainingNonRecentQuestions[randomNumber];
      setFlashcard(selectedCard);        
      //setCurrentQuestion(flashcards[flashcard]);
      return         
  }

  function askWrittenResponseQuestion(){
        
    let remainingWrittenQuestions: number[] = [];

    //filters the correctlyAnsweredQuestions state array and pushes any questions yet to be correctly answered to 
    //the remaining questions array
    completeSet.forEach((x)=>{
        if (!answeredWrittenQuestions.includes(x)){
            return remainingWrittenQuestions.push(x);
        }
    })        
    //if there are no remaining questions, the time to complete the set is computed and delivered as part of a success message
    /*
    [ADD CODE HERE ABOUT THE TOTAL MARKS FOR WRITTEN RESPONSE]
    */
    if (remainingWrittenQuestions.length === 0){
        const finishingTime = Date.now();
        const timeElapsed = (finishingTime - startTime)/1000;
        setWrittenFlashcard(-1);
        const marksOutOf = harvestAssessmentData(assessmentData);
        return setResponse(`Great job! ${completeSet.length} multiple choice questions answered correctly in ${count} attempts and in ${timeElapsed} seconds and ${marksOutOf.correctAnswers} marks out of ${marksOutOf.maximumMark} in written response Woop!`);
    }
    
    //a random number is generated to select at random from one of the remainingNonRecent questions
    let randomNumber = Math.floor(Math.random() * remainingWrittenQuestions.length);
    
    let selectedCard = remainingWrittenQuestions[randomNumber];
    
    setWrittenFlashcard(selectedCard);
    
    return
}

  const handleClick = () => {
    const startingTime = Date.now();
    setStartTime(startingTime);
    console.log('start time...')
    console.log(startTime);
    return askQuestion();
}

const handleWrittenClick = () => {
    //function creates an array and helps to create a context
    //console.log('flashcardData...')
    //console.log(flashcardData);
    
    let arrayOfResponsesInitiator: assessedResponse[] = [];
    completeSet.forEach((x: number) => {
        arrayOfResponsesInitiator.push({
            id: Number(allFlashcardsData[x].id),
            response: "",
            checkedPoints: {
              W: false,
              X: false,
              Y: false,
              Z: false
            }
        })        
    })
    console.log("arrayOfResponsesInitiator...");
    console.log(arrayOfResponsesInitiator);
    setResponseAssessment(arrayOfResponsesInitiator);
    
    return askWrittenResponseQuestion();
}
  /*
    Queue question logs the three most recent incorrect answers so that the same question is only ever asked twice in a row once
    the user has only that one remaining question left
    */
    const queueQuestion = (question: number) => {
      //copies array of recent questions
      let updatedRecentQuestions = recentQuestions;
      //if recent questions includes the question being queued, it is removed and reinserted at the back of the queue
      if (recentQuestions.includes(question)){
          updatedRecentQuestions = recentQuestions.filter((questionToCheck)=> {
          return questionToCheck !== question;
          })
          updatedRecentQuestions.push(question);
      }
      //if there are fewer than three questions in the queue and the current question is not among them, the current question
      //is added to the back of the queue
      else if ((recentQuestions.length < 3)&&(!recentQuestions.includes(question))){
          updatedRecentQuestions.push(question);            
      } 
      //if there are already three questions in the queue and the current question is not among them, the current question
      //is added to the back of the queue and the question at the front of the queue is removed
      else if ((recentQuestions.length === 3)&&(!recentQuestions.includes(question))){
          updatedRecentQuestions.shift();
          updatedRecentQuestions.push(question);            
      }
      //the updated queue of recent questions is passed to state
      return setRecentQuestions(updatedRecentQuestions);
  }

  /*
    Answer question function
    */

    const answerQuestion = (suggestedAnswer: string) => {
      //obtains the correct answer from the flashcards data object
      const correctAnswer = allFlashcardsData[flashcard].correct_answer;
      //if the selected answer is the correct answer, that question is pushed into the correctly answered questions array in state
      //if the selected answer is wrong, that question is placed into the queue in state for recently answered wrong questions
      
      if (suggestedAnswer === correctAnswer){
          setResponse("You got it right. Woop!!");
          let updatedArray = correctlyAnsweredQuestions;
          updatedArray.push(flashcard);
          setCorrectlyAnsweredQuestions(updatedArray);
      } else {
          setResponse("Yikes, you got it wrong!");
          queueQuestion(flashcard);
      }
      //increments count of question attempts
      setCount(count+1);
      //setResponse("");            
          //return askQuestion();
      //sets a timer so user has time to read success message before next question
      setTimeout(() => {
          setResponse("");            
          return askQuestion();
      }, 500);
  }

  //event listener passes div id for clicked question to the answerQuestion function
  const handleQuestionClick = (event: React.MouseEvent<HTMLDivElement>) => {     
    return answerQuestion(event.currentTarget.id);    
  }
  
  //used to submit written response, now seems unnecessary
  /*
  const handleEnteredValue = (event) => {
    //console.log(event.target.value);
    return setEnteredValue(event.target.value)
}*/

//this removes the question and input box and replaces it with the user's response and an assessment checklist to tick off
const processResponse = () => {
    console.log("process response called");
    console.log(responseAssessment);
    return setWrittenStage("feedback");
}

const handleSubmitChecklist = (event) => {
    //there is a feedback / response toggle that alternately shows either the flashcard or the assessment checklist, this
    //effectively calls teh next flashcard
    setWrittenStage("response");
    //this creates a mutable copy of the answeredWrittenQuestions (an array of the numbers of the questions already answered)
    let updatedAnsweredQuestionsArray = answeredWrittenQuestions;
    //pushes in the id of the question just answered
    updatedAnsweredQuestionsArray.push(writtenFlashcard);
    //updates the state with the new array including all the questions answered
    setAnsweredWrittenQuestions(updatedAnsweredQuestionsArray);
    
    return askWrittenResponseQuestion();
}

return (
  
    <div>
      <p>Flashcards presentation page</p>
            <button onClick={handleClick}>Click for question</button>
            <button onClick={handleWrittenClick}>Click for written response question</button>
            <p>Question: {flashcard}</p>
            
            { flashcard === -1 ? 
            null
            :
            <MultipleChoiceQuestion 
            oneFlashcardData={allFlashcardsData[flashcard]}            
            handleQuestionClick={handleQuestionClick}
            />              
             
            }

            { response ? 
            <Response               
              summary={response}
            />  
            : null}

            { writtenFlashcard === -1 ? 
            null
            : 
            <ResponseAssessmentContext.Provider value={responseAssessment}>
              <WrittenFlashcard
                oneFlashcardData={allFlashcardsData[writtenFlashcard]}
                questionId={writtenFlashcard}
                submitResponse={processResponse}            
                writtenStage={writtenStage}
                writtenResponse={writtenResponse}
                submitChecklist={handleSubmitChecklist}
              />
            </ResponseAssessmentContext.Provider>
            }

      
        {/*{flashcardData.map((flashcard) => (
            <div key={flashcard.id} className="flex flex-col items-center gap-2">
              <IndividualFlashcard 
              flashcardData={flashcard}
              />              
              {/*<p>{flashcard.multiple_choice_responses}</p>
              <p>{flashcard.checklist}</p>*//*}
            </div>
          ))}*/}
    </div>
    
)
}