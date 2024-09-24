//"use client";
//import * as jsonArray from '../lib/flashcard-seed-data.json';
//import FlashcardPresentation from '../ui/dashboard/flashcards';
//import DOMPurify from "isomorphic-dompurify";
//import { createContext, useContext, useState } from 'react';
//import { Flashcard } from "@/app/lib/definitions";
//import { fetchFlashcards, fetchExamboards } from '../lib/data';
///import { FlashcardData, ExamboardData } from '../lib/definitions';
import Topic from "@/app/ui/dashboard/topic"
import { fetchTopics } from "@/app/lib/data";
import { TopicData } from "@/app/lib/definitions";
import Link from "next/link";

export default async function Page({ params }: { params: { examboard_id: string } }) {
    

    //console.log(`from params the id is: ${params.id}`);

    const topics = await fetchTopics(params.examboard_id);

    //console.log(topics);  


    return (
      <div>
        <p>Select your topic</p>
        {topics.map((x: TopicData) => (
            <div key={x.id}>
                <Link
                  href={`/flashcards/${x.examboards_id}/topic/${x.id}/set`}
                >
                    {x.topic}
                </Link>

            </div>
        ))}
        
        
       
        
      </div>
    )
}

