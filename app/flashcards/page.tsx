//"use client";
import * as jsonArray from '../lib/flashcard-seed-data.json';
import FlashcardPresentation from '../ui/dashboard/flashcards';
import DOMPurify from "isomorphic-dompurify";
//import { createContext, useContext, useState } from 'react';
//import { Flashcard } from "@/app/lib/definitions";
import { fetchFlashcards } from '../lib/data';

//type ThemeContextType = "light" | "dark";

//export const ThemeContext = createContext<ThemeContextType>("light");

//export const FlashcardContext = createContext<Flashcard | null>(null);

export default async function Page() {
    //need to figure out how to avoid using "any" all the time
    //const [stateFlashcardData, setStateFlashcardData] = useState<any>([]);

    //const [theme, setTheme] = useState<ThemeContextType>("dark");
    //const [theme, setTheme] = useState<string>("light");
    //fetch data from server
    const flashcardData = await fetchFlashcards();

    if (!flashcardData || flashcardData.length === 0) {        
      return <p className="mt-4 text-gray-400">No data available.</p>;
    }

    //assign database data to state
    //setStateFlashcardData(flashcardData);

    //setTheme("dark");
    //create context - this enables it either to be null or to have a type that matches the imported Flashcard type
    //const FlashcardContext = createContext<Flashcard | null>(null);
    //const FlashcardContext = createContext<any>("light");

    //const newArray = jsonArray;
    //{/*<FlashcardContext.Provider value={{ stateFlashcardData }}>*/}

    return (
        <FlashcardPresentation
          flashcardData={flashcardData}
        />        
    )
}

/*
<ThemeContext.Provider value={theme}>
            <FlashcardContext.Provider value={stateFlashcardData}>
                <FlashcardPresentation />
            </FlashcardContext.Provider>
        </ThemeContext.Provider>
<div>
            <p>Welcome to flashcards</p>
            <ThemeContext.Provider value={theme}>
              <FlashcardPresentation />
            </ThemeContext.Provider>
             {/*<Interweave content="This string contains <b>HTML</b> and will safely be rendered!" />;
            
            <Interweave
              content={egHTML}
            />            
            <Markup content="This string <b>contains</b> HTML." />*//*}
            </div>
*/