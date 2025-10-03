'use client';

import { useState, createContext } from 'react';

export interface Slider {
    toggleSlider: () => void;
    showSlider: boolean;
  };

export const TextSizeButtonContext = createContext({toggleSlider: () => {console.log('finally I got some action!')}, showSlider: false});

export default function Providers ({
    children,
}: {
    children: React.ReactNode;
  }) {

    const [showSlider, setShowSlider] = useState(false);

    const toggleSliderFunction = () => {
      window.alert("button clicked")
        setShowSlider(!showSlider);
    }

  return (
    <TextSizeButtonContext.Provider value={{toggleSlider: toggleSliderFunction, showSlider: showSlider}}>
      {children}
    </TextSizeButtonContext.Provider>
  );
}