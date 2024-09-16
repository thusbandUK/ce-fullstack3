import React from 'react';
import { Flashcard } from '@/app/lib/definitions';

export default function MultipleChoiceQuestion(props: any) {

    /*
    
    {questionBundle}: {questionBundle: Flashcard},
    {handleQuestionClick}: {handleQuestionClick: any}


    */
    //{handleQuestionClick: (event: string)}
    //if (props){
    const {name, multiple_choice_responses: multipleChoiceResponses, question} = props.questionBundle;
//}
    //{questionBundle}: {questionBundle: Flashcard}
    //console.log(props);
    //{questionBundle, handleQuestionClick}: {questionBundle: Flashcard}


    return (
        <div>
            {/*<p>I am the multiple choice question component</p>*/}
            <div>                
                    <h2>{question}</h2>
                    
                   {Object.keys(multipleChoiceResponses).map((MCQ) => (
                     <div onClick={props.handleQuestionClick} key={MCQ} id={MCQ} style={{cursor:'pointer'}}>
                        <p>{MCQ}</p>                        
                        <p>{multipleChoiceResponses[MCQ]}</p>
                    </div>
                    ))}
                
            </div>

        </div>
    )
}