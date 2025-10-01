'use client';

//import { ThemeProvider } from 'acme-theme';
//import { AuthProvider } from 'acme-auth';
//import { ButtonProvider } from 'somewhere'
//import { TextSizeButtonContext } from './ui/dashboard/textEnlargeContainer';
import { useState, createContext } from 'react';

export interface Slider {
    toggleSlider: () => void;
    showSlider: boolean; // collected on a different wizard page
    
  };

export const TextSizeButtonContext = createContext({toggleSlider: () => {console.log('finally I got some action!')}, showSlider: false});
//export const TextSizeButtonContext = createContext(null);

export default function Providers ({
    children,
  //}: Readonly<{
    //children: React.ReactNode;
  //}>) {
}: {
    children: React.ReactNode;
  }) {
    //const [showSlider, setShowSlider] = useState<boolean>(false);
    const [showSlider, setShowSlider] = useState(false)
    //const showSliderGetterSetter = useState({
      //  showSlider: false,
       // toggleSlider: () => void
     // });

     console.log('am I rendering?')



    const toggleSliderFunction = () => {
        console.log('toggle slider activated');
        setShowSlider(!showSlider);
    }

    const values = {toggleSlider: toggleSliderFunction, showSlider: showSlider}

  return (
    <TextSizeButtonContext.Provider value={{toggleSlider: toggleSliderFunction, showSlider: showSlider}}>
      {children}
    </TextSizeButtonContext.Provider>
  );
}

//</TextSizeButtonContext.Provider><TextSizeButtonContext.Provider value={showSliderGetterSetter}>