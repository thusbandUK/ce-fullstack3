import React from 'react';

const Response = ({summary}: {summary: string}) => {

    //const { assessmentData, summary } = props;
    


    return (
        <div>
            <p>{summary}</p>
            {/*{Object.keys(assessmentData).map((x) => {

                return (
                    <div>
                      <p>Question {x}</p>
                      <p>{assessmentData[x].question}</p>
                      <p>Response</p>
                      <p>{assessmentData[x].response}</p>
                      <p>Correct</p>
                      {assessmentData[x].checklist.map((y) => {
                        if (y.checked === true){
                            return (
                                <div>
                                    {y.markingPoint}
                                </div>
                            )
                        }
                      })}
                      <p>Not included</p>
                      {assessmentData[x].checklist.map((y) => {
                        if (y.checked === false){
                            return (
                                <div>
                                    {y.markingPoint}
                                </div>
                            )
                        }
                      })}
                    </div>
                )
            })}*/}

        </div>
    )
}

export default Response;