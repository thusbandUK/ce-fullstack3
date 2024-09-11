//"use client";
import * as jsonArray from '../lib/flashcard-seed-data.json';
import FlashcardPresentation from '../ui/dashboard/flashcards';

//import { Interweave, Markup } from "interweave"

export default function Page() {
    const egHTML = "<p>Hello, I am a paragraph with <sup>superscript</sup></p>";
    //console.log(json);
    //const parsedJson: object[] = JSON.parse(jsonArray);
    //const parsedJson = JSON.parse(jsonArray[0])
    //console.log(JSON.stringify(jsonArray[0]))
    /*jsonArray.map(x => {
        console.log(x.id);
    })*/

    //const newArray = jsonArray;

    return (
        <main>
            <p>Welcome to flashcards</p>
            <FlashcardPresentation />
           
             {/*<Interweave content="This string contains <b>HTML</b> and will safely be rendered!" />;
            
            <Interweave
              content={egHTML}
            />            
            <Markup content="This string <b>contains</b> HTML." />*/}
        </main>

    )
}