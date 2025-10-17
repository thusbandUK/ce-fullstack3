'use client';

import { useState, createContext } from 'react';

export interface Slider {
    toggleSlider: () => void;
    showSlider: boolean;
  };

export const TextSizeButtonContext = createContext({toggleSlider: () => {}, showSlider: false, showButton: (value: boolean) => {}, buttonShowing: false});

export default function Providers ({
    children,
}: {
    children: React.ReactNode;
  }) {

    const [showSlider, setShowSlider] = useState(false);
    const [buttonShowing, setButtonShowing] = useState(false);

    //toggles the appearance of the slider, which enables resizing of text when it is showing
    const toggleSliderFunction = () => {
      setShowSlider(!showSlider);
    }

    //enables the textEnlarge button to be shown or removed
    const showButtonFunction = (value: boolean) => {
      setButtonShowing(value);
    }    

  return (
    <TextSizeButtonContext.Provider value={{toggleSlider: toggleSliderFunction, showButton: showButtonFunction, showSlider: showSlider, buttonShowing: buttonShowing}}>
      {children}
    </TextSizeButtonContext.Provider>
  );
}