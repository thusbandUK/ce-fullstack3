import { useEffect } from 'react';

export default function InputBox({
    h1Ref,
    submitBoxRef,
    handleResponseChange,
    handleHeight
}: {
    h1Ref: React.RefObject<HTMLDivElement>,
    submitBoxRef: React.RefObject<HTMLDivElement>,
    handleResponseChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => string,
    handleHeight: (newHeight: number) => void
}){
    /*
    const { height: screenHeight, width: screenWidth } = window.screen;
    const h1Height = typeof h1Ref.current?.children[0].clientHeight === 'number' ? h1Ref.current?.children[0].clientHeight : 0;
    const submitBox = typeof submitBoxRef.current?.children[0].clientHeight === 'number' ? submitBoxRef.current?.children[0].clientHeight : 0;    

    useEffect(() => {
        if (screenWidth >= 792){
            return;
        }
        const heightToSet = (screenHeight * 0.84) - h1Height - submitBox;
        handleHeight(heightToSet)
    }, [screenHeight, h1Height, submitBox])
    */
    return (
        <>
          <textarea 
            id="response"
            onChange={handleResponseChange}
            name="response"
            rows={5} cols={33}
            className="border-2 border-black rounded-lg p-5 md:p-5 w-full h-full"
            placeholder="Write your answer here..."                      
          />
        </>
    )
}