import React from 'react';
import { useRef, useEffect } from 'react';

const MultipleChoiceResponse = (
    {
        rightOrWrong
    }: 
    {
        rightOrWrong: string
    }
) => {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {        
          ref.current?.focus();         
      }, []);

    return (
        <div className="bg-elephant-violet text-white absolute border-2 border-black rounded-lg p-5 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
           
            <div className="flex flex-col items-center">                
                { rightOrWrong === 'right' ? <span style={{fontSize: "100px"}}>&#129395;</span> : <span style={{fontSize: "100px"}}>&#128556;</span>}
                <p className="text-center" tabIndex={0}  ref={ref}  role="dialog" id="text-response" aria-live="polite" style={{fontSize: '1rem'}}>{ rightOrWrong === 'right' ? 'You got it right. Woop!' : 'Yikes, you got it wrong!'}</p>
            </div>
        </div>
    )
}

export default MultipleChoiceResponse;