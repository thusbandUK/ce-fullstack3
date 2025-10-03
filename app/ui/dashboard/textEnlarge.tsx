"use client";

import { TextSizeButtonContext } from "@/app/providers";
import { useContext } from "react";

/*

Connectivity

This component renders a button with two differently sized capital A's, ie a text resizing button.
It is designed to appear in the navbar on suitable pages, including the flashcards page, so that text
can be responsively resized. It works via a React context - TextSizeButtonContext - so that the effect of
clicking it can be transmitted to flashcards.tsx in ui/dashboard, which is not a direct parent or child.
In order for said transmission to be possible, both this component and flashcards.tsx need to be children (of children of etc...) 
of the RootLayout component in /layout.tsx. Meanwhile the {children} term in /layout.tsx needs to be 
sandwiched by the tags for the Providers component in /providers.tsx, where the TextSizeButtonContext 
is initiated.

Conditional rendering

This should only show on pages where it can be used, specifically the flashcards dashboard, hence the
parent element textEnlargeContainer. It cannot be conditionally rendered directly via the grandparent
navbar component, since it is a use server component which cannot manage state / read the url
*/

export default function TextEnlarge(){

//this assigns the colours of the letters (the two A's)
const svgFillColour = '#D98FBF';
//this assigns the background colour of the button
const backgroundColour = 'black';

//this extracts the reference to the toggleSlider function initiated in Providers
const { toggleSlider } = useContext(TextSizeButtonContext)

//toggles showSlider true / false
const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
  
  toggleSlider()
  return
}

return (
      <div className="absolute enlarge-text">
        <button onClick={handleClick} aria-label="resize text">
        <svg id="enlarge-text-svg" style={{backgroundColor: backgroundColour}} width="76" height="76" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
          {/*<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
          <title>ic_fluent_text_font_size_24_regular</title>
          <desc>Created with Sketch.</desc>*/}
          <g id="🔍-Product-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="ic_fluent_text_font_size_24_regular" fill={svgFillColour} fillRule="nonzero">
              <path d="M10.2117996,17.11 L15.0431923,3.49912344 C15.2655277,2.87273643 16.1123594,2.83593533 16.4081048,3.38865641 L16.456812,3.49920006 L21.9568006,18.999686 C22.0953136,19.3900539 21.8911449,19.8187965 21.5007771,19.9573094 C21.14294,20.0842797 20.7528573,19.9233021 20.5836383,19.5949082 L20.5431537,19.5012859 L18.9457996,15 L12.5517996,15 L10.9724231,19.4521469 C10.9199434,19.6396056 10.7952983,19.804822 10.617297,19.9044945 L10.5251332,19.9481977 C10.171909,20.087487 9.7764843,19.9401182 9.59599148,19.6177829 L9.55228824,19.5256192 L8.5557996,17 L4.4427996,17 L3.44747776,19.5208817 C3.30788849,19.8739875 2.9301318,20.0620782 2.57143476,19.9736808 L2.47427411,19.9426336 C2.1211683,19.8030443 1.93307758,19.4252876 2.02147501,19.0665906 L2.05252224,18.9694299 L5.80613337,9.47427411 C6.0415216,8.87883471 6.84863764,8.84414583 7.1508398,9.36975012 L7.20132289,9.47486675 L10.2117996,17.11 L15.0431923,3.49912344 L10.2117996,17.11 Z M6.50274363,11.792264 L5.0357996,15.5 L7.9637996,15.5 L6.50274363,11.792264 Z M15.7498671,5.99248097 L13.0837996,13.5 L18.4137996,13.5 L15.7498671,5.99248097 Z" id="🎨-Color">
                
              </path>
            </g>
          </g>
        </svg>
        </button>
      </div>
)
}