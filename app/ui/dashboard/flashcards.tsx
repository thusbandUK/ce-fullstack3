"use client";

//import { fetchFlashcards } from "@/app/lib/data"
//import DOMPurify from "isomorphic-dompurify";
//import IndividualFlashcard from "./individual-flashcard/IndividualFlashcard";
import { createContext, useState } from 'react';
import { FlashcardData } from "@/app/lib/definitions";
import MultipleChoiceQuestion from "./multipleChoiceQuestion";
import Response from "./response";
import { assessedResponse } from "@/app/lib/definitions";
import WrittenFlashcard from "./writtenFlashcard";
//import { CardSkeleton } from './skeletons';
//import { Suspense } from 'react';
//import MenuItem from './menuItem';
import MenuItemButton from './menuItemButton';

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
    const [startTime, setStartTime] = useState<number>(0);
    //this stores the question numbers of all the questions loaded up from the data source
    const [completeSet, setCompleteSet] = useState<number[]>([]);    
    //this stores the stage for the written response. It is toggled between "response", when user enters response
    //and "feedback", when user checks off their correct answers
    const [writtenStage, setWrittenStage] = useState("response");    
    //state management for written responses and checklist of points made (assessment data)
    const [responseAssessment, setResponseAssessment] = useState<assessedResponse[]>([]);
    

    //this creates an array of sequential integers, one for each flashcard, and sets completeSet in state
    //(rather than using the native id values in allFlashcardsData, which are unlikely to be sequential)
    const assignCompleteSet = (inputArray: FlashcardData[]) => {
        //immediate return if the function has already been used, otherwise the app gets stuck in an infinite loop
        //because the page rerenders every time the state is edited
        if (completeSet.length > 0){
            return;
        }
        const outputArray: number[] = [];
        for (let x = 0; x < inputArray.length; x ++){            
            outputArray.push(x);
        }        
        return setCompleteSet(outputArray);
    }

    //calls above function w incoming allFlashcardsData
    assignCompleteSet(allFlashcardsData);

    function harvestAssessmentData(){
        //let questionNumbers = Object.keys(feedbackObject);
        let maximumMark = 0;
        let correctAnswers = 0;
        responseAssessment.forEach((a) => {
            Object.keys(a.checkedPoints).forEach((b: string)=> {
                maximumMark ++;
                if (a.checkedPoints[b as keyof assessedResponse["checkedPoints"]]){
                    correctAnswers ++;
                }
            })
        })
        return {correctAnswers: correctAnswers, maximumMark: maximumMark};


        /*questionNumbers.forEach((x)=> {
            feedbackObject[x].checklist.forEach((y) => {
                maximumMark ++;
                if (y.checked === true){
                    correctAnswers ++;
                }                
            })            
        })
        return {correctAnswers: correctAnswers, maximumMark: maximumMark};*/
    }
    /*
    Ask question initiates a set of questions, it will work through all of the questions in the stated array
    */

    function askQuestion(){
      //Creates an iterable array of the keys for the different flashcards in the object
      //correctly answered questions will be successively removed until the array is empty
      const completeQuestionSet = completeSet;
      //creates an array of the questions yet to be answered correctly
      const remainingQuestions: number[] = [];
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
          setResponse(`Great job! ${completeSet.length} questions answered correctly in ${count} attempts and in ${timeElapsed} seconds. Woop!`);
          setFlashcard(-1);
          return;
          //return askWrittenResponseQuestion();
      }
      //if the number of recently answered questions is greater than or equal to the number or remaining questions, the question
      //at the front of the recentQuestions queue is assigned
      if (remainingQuestions.length <= recentQuestions.length){
          const updatedRecentQuestions: number[] = recentQuestions;
          //come back and sort out the any, should be number but that wasn't accepted
          const selectedQuestion: any = updatedRecentQuestions.shift();
          setRecentQuestions(updatedRecentQuestions);
          setFlashcard(selectedQuestion);
          return //setCurrentQuestion(flashcards[flashcard]);
      }
      //if more questions remain than are stored in the recently answered queue, the remaining questions are filtered to remove
      //any of those in the recently answered array, to ensure that the same question is only answered twice in a row if it is the
      //last remaining question
      const remainingNonRecentQuestions = remainingQuestions.filter((question)=> {
          return !recentQuestions.includes(question);
      })
      //a random number is generated to select at random from one of the remainingNonRecent questions
      const randomNumber = Math.floor(Math.random() * remainingNonRecentQuestions.length);
      const selectedCard = remainingNonRecentQuestions[randomNumber];
      setFlashcard(selectedCard);        
      //setCurrentQuestion(flashcards[flashcard]);
      return         
  }

  function askWrittenResponseQuestion(){
    //keep this for the time being, just to check that info is getting updated
    console.log(responseAssessment);
        
    const remainingWrittenQuestions: number[] = [];

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
        //const finishingTime = Date.now();
        //const timeElapsed = (finishingTime - startTime)/1000;
        //resets the question in hand to -1 to remove the WrittenFlashcard component
        setWrittenFlashcard(-1);
        //iterates through the assessment data to calculate how many ticks they got out of a possible total
        const marksHarvest = harvestAssessmentData();
        //returns a response summarising performance
        return setResponse(`Great job!  ${marksHarvest.correctAnswers} marks out of ${marksHarvest.maximumMark} in written response. See your points to work on below.`);
    }
    
    //a random number is generated to select at random from one of the remainingNonRecent questions
    const randomNumber = Math.floor(Math.random() * remainingWrittenQuestions.length);
    
    const selectedCard = remainingWrittenQuestions[randomNumber];
    
    setWrittenFlashcard(selectedCard);
    
    return
}

//this function initiates the multiple choice format of questions
  const handleClick = () => {
    const startingTime = Date.now();
    setStartTime(startingTime);    
    return askQuestion();
}

//this function initiates the written response format of question
const handleWrittenClick = () => {
    //function creates an array of objects in which assessment data will be stored, then passes it to state to 
    //create a context which can be used in children components
    
    //resets response statement
    setResponse("");
    
    const arrayOfResponsesInitiator: assessedResponse[] = [];
    completeSet.forEach((x: number) => {
        arrayOfResponsesInitiator.push({
            id: Number(allFlashcardsData[x].id),
            flashcardDataIndex: x,
            response: "",
            checkedPoints: {
              W: false,
              X: false,
              Y: false,
              Z: false
            }
        })        
    })
    
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
          const updatedArray = correctlyAnsweredQuestions;
          updatedArray.push(flashcard);
          setCorrectlyAnsweredQuestions(updatedArray);
      } else {
          setResponse("Yikes, you got it wrong!");
          queueQuestion(flashcard);
      }
      //increments count of question attempts
      setCount(count+1);
      
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

//this removes the question and input box and replaces it with the user's response and an assessment checklist to tick off
const processResponse = () => {
    return setWrittenStage("feedback");
}

const handleSubmitChecklist = () => {
    //there is a feedback / response toggle that alternately shows either the flashcard or the assessment checklist, this
    //effectively calls the next flashcard
    setWrittenStage("response");
    //this creates a mutable copy of the answeredWrittenQuestions (an array of the numbers of the questions already answered)
    const updatedAnsweredQuestionsArray = answeredWrittenQuestions;
    //pushes in the id of the question just answered
    updatedAnsweredQuestionsArray.push(writtenFlashcard);
    //updates the state with the new array including all the questions answered
    setAnsweredWrittenQuestions(updatedAnsweredQuestionsArray);
    
    return askWrittenResponseQuestion();
}

return (
  
    <div>
      <h1>Flashcards presentation page</h1>
        
         

            { 
              (flashcard !== -1) || (writtenFlashcard !== -1) ?
              
              null:
            
              <div className='grid md:grid-cols-2 gap-0 mt-10'>
                <MenuItemButton
                  heading="Multiple choice"
                  content="Select to answer flash cards using multiple choice responses"
                  signalClick={handleClick}
                  arrowCommand='SELECT'
                ></MenuItemButton>
                <MenuItemButton
                  heading="Written response"
                  content="Select to write our your own responses to flash card questions"
                  signalClick={handleWrittenClick}
                  arrowCommand='SELECT'
                ></MenuItemButton>
              </div>
            }
            
            
            {/*Renders a multiple choice question*/}
            { flashcard === -1 ? 
            null
            :
            <MultipleChoiceQuestion 
              oneFlashcardData={allFlashcardsData[flashcard]}            
              handleQuestionClick={handleQuestionClick}
            />             
            }

            {/*Renders a written response question */}
            { writtenFlashcard === -1 ? 
            null
            : 
            <ResponseAssessmentContext.Provider value={responseAssessment}>
              <WrittenFlashcard
                oneFlashcardData={allFlashcardsData[writtenFlashcard]}                
                submitResponse={processResponse}            
                writtenStage={writtenStage}                
                submitChecklist={handleSubmitChecklist}
              />
            </ResponseAssessmentContext.Provider>
            }
            
            {/*Renders the response once all flashcards completed */}
            { response ? 
            <ResponseAssessmentContext.Provider value={responseAssessment}>
              <Response               
                summary={response}
                allFlashcardsData={allFlashcardsData}
              />
            </ResponseAssessmentContext.Provider>
            : null}
        
    </div>
    
)
}