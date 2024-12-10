"use server"

import { fetchExamboards } from '../../lib/data';
import { ExamboardData, ModalContent } from '../../lib/definitions';
import MenuItem from '../../ui/dashboard/menuItem';
import { incrementExamboard } from '../../lib/actions';
import { Suspense } from "react";
import { CardSkeleton, ExamSkeleton } from "@/app/ui/dashboard/skeletons";
import DashboardSkeleton from '@/app/ui/dashboard/skeletons';

export default async function Page() {

    const examboardsData = await fetchExamboards();   

    //if users show interest by clicking on an examboard that currently has no flashcards, this
    //transforms the event into a database call which logs the number of button clicks for that
    //examboard
    const handleLogInterest = async (examBoard: string) => {
      "use server"
      await incrementExamboard(examBoard);
      return;
    }

    const modalContent: ModalContent = {
      heading: 'Coming soon!',
      content: 'Sorry, flashcards for this examboard are not available yet, but do not worry, your interest has been logged.',
      link: null
    }    
//className='w-11/12 md:w-4/5 mx-auto mt-10'
    return (
      <div  className="w-full md:w-4/5 mx-auto mt-10 p-2">
        
        <h1>Select your examboard</h1>
        <div className="grid md:grid-cols-3 gap-0 mt-10">
          
          {examboardsData.map((x: ExamboardData) => (
            
            <div key={x.id} className="border-2 border-black rounded-lg p-5">
              <Suspense key={x.id} fallback={<CardSkeleton />}>
              <MenuItem
                heading={x.examboard}
                content={x.description}
                link={`/flashcards/${x.id}/topic`}                
                modalContent={!x.has_flashcards ? modalContent : null}
                identifier={x.id}                
                logInterest={handleLogInterest}
                arrowCommand={x.has_flashcards ? 'SELECT' : 'INQUIRE'}
              >              
              </MenuItem>
              </Suspense>
              
            </div>
            
          ))}   
               
        </div>        
      </div>
    )
}

/*
<Suspense key={x.id} fallback={<CardSkeleton />}></Suspense>
*/