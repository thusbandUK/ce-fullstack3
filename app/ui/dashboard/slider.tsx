"use client"
import { useState } from "react"

/*
This component renders a range slider, which is used to resize the text on the page of the multiple
choice questions
*/

export default function Slider (
    {modifyFontSize}
    :
    {modifyFontSize: (fontSize: number) => void}
) {
    //manages value of range slider
    const [sliderValue, setSliderValue] = useState<number>(40);

    //updates font size via state of parent MCQZoom element
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {        
        setSliderValue(Number(event.currentTarget.value));
        modifyFontSize(Number(event.currentTarget.value));
        return 

    }

    return (
        <>
          <input 
            onChange={handleSliderChange} 
            id="text-size-slider"
            type="range"
            min={16}
            max="72"
            value={sliderValue}
            className="range text-blue-300" 
          />
        </>
    )
}