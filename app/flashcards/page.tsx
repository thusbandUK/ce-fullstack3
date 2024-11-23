//"use client";
//import { createContext, useContext, useState } from 'react';
//import { Flashcard } from "@/app/lib/definitions";
import { fetchExamboards } from '../lib/data';
import { ExamboardData } from '../lib/definitions';
import Link from 'next/link';
//import { auth } from "auth";
import MenuItem from '../ui/dashboard/menuItem';




export default async function Page() {
    
    //const allFlashcardsData = await fetchFlashcards();
    //let allFlashcardsData: FlashcardData[] = [];
    //let examboardData: ExamboardData[] = [];

    //console.log(allFlashcardsData);
    //console.log(allFlashcardsData.length === 0)
    const examboardsData = await fetchExamboards();

    


    //console.log(examboardsData);
/*
    const handleSelectionAllCards = async () => {
      const collectedFlashcardsData = await fetchFlashcards();
      return allFlashcardsData = collectedFlashcardsData;
    }

    

    
    if (!allFlashcardsData || allFlashcardsData.length === 0) {        
      return <p className="mt-4 text-gray-400">No data available.</p>;
    }*/

    const otherExamboards: {name: string, content: string}[] = [{name: 'AQA', content: 'A-level Chemistry 7405'}, {name: 'Edexcel', content: 'Pearson Edexcel Level 3 Advanced GCE in Chemistry (9CH0)'}, {name: 'OCRB', content: 'Chemistry B (Salters) - H033, H433'}, {name: 'CIE/CIAE', content: 'Cambridge International AS & A Level Chemistry (9701)'}]

    return (
      <div className='w-11/12 md:w-4/5 mx-auto mt-10'>
        
        
        <h1>Select your examboard</h1>
        <div className="grid md:grid-cols-3 gap-0 mt-10">
          {examboardsData.map((x: ExamboardData) => (
            <div key={x.id} className="border-2 border-black rounded-lg p-5">
              <MenuItem
                heading={x.examboard}
                content='CHEMISTRY A H432'
                link={`/flashcards/${x.id}/topic`}                
              >              
              </MenuItem>
            </div>
          ))}
        
        {otherExamboards.map((x: {name: string, content: string}) => (
          <div key={x.name} className="border-2 border-black rounded-lg p-5">
            <MenuItem
              heading={x.name}
              content={x.content}
              link={`/flashcards/${x.name}/topic`}                
            >              
            </MenuItem>            
          </div>
        ))}
        </div>
        
        {/**
        
        {allFlashcardsData.length === 0 ? 
        <div>
          <button onClick={handleRandomSelection}>
            Random selection of 10 cards from the whole collection
          </button>
          <button onClick={handleSelectionAllCards}>
            All of the cards from the whole collection
          </button>
        </div>
        :
        null
        }
         */}
        {/*
        {allFlashcardsData.length === 0 ?
        null:
        <FlashcardPresentation
          allFlashcardsData={allFlashcardsData}
        />
        }
        * */}
      </div>
    )
}

/**
 * {examboardsData.map((x: ExamboardData) => (
          <div key={x.id} className="border-2 border-black rounded-lg p-5">
            <MenuItem
                heading={x.examboard}
                content=''
                link={`/flashcards/${x.id}/topic`}                
              >              
              </MenuItem>
            <Link
              href={`/flashcards/${x.id}/topic`}
            >
              <h6>{x.examboard}</h6>
            </Link>
            <div className="spacer"></div>

          </div>
        ))}
 */