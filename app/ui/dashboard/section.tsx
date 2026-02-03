import LeftHandColumn from "./leftHandColumn"
import RightHandColumn from "./rightHandColumn"
import IndividualElephantContainer from "@/app/animation/individualElephantContainer";
import clsx from "clsx";
/*
section, do it like the portfolio so if the key is an even number, swing left, odd right,
that way the elephants will start white or no alternately
AND
the elephant will appear left or right alternately

OR elephant false because maybe not every single one wants an elephant



/* Note how default props are defined below *//*
const IndividualElephantContainer: React.FC<ElephantProps>= ({startWhite = true, sizeModifier = 0.2}
) => {

    : {
        children: React.ReactNode,
        keyNumber: number
    }

*/
interface SectionProps {
    //startWhite?: boolean;
    //sizeModifier?: number;
    children: React.ReactNode;
    keyNumber: number;
    topMargin?: boolean;
    title?: string;
  }

//export default function Section React.FC<SectionProps> (
    //
export const Section: React.FC<SectionProps> = (
    {
        children,
        keyNumber,
        topMargin = true,
        title = ""
    }) => {
const elephantLeft = keyNumber % 2 === 0;
//const keyBoolean = true;
    return (
      <section>
        <div 
          key={keyNumber}
          className={clsx("md:grid md:grid-cols-6 gap-0 w-full items-center justify-center rounded-lg",
            {
                "mt-[40]": topMargin                
            }
          )}
        >
          {
            title ?
            <div className="border w-full flex flex-col border-black rounded-lg px-5 md:px-[40] py-1 m-auto col-start-1 col-span-6">
              <div className="spacer"></div>
                <h2>{title}</h2>
              <div className="spacer"></div>
            </div>
            :
            null
          }          
          <div className={clsx("col-start-1 col-span-6 h-full w-full flex flex-col justify-center border border-black rounded-lg p-5 md:p-[40]",
            {
                "md:col-span-4": !elephantLeft,
                "md:col-span-2": elephantLeft
            }
          )}>
            {
              elephantLeft ?
              <IndividualElephantContainer 
                startWhite={elephantLeft}
              />
              :
              children
            }
          </div>
          <div className={clsx("col-start-1 h-full col-span-6 border border-black rounded-lg flex flex-col justify-center p-5 md:p-[40]",
            {
                "md:col-start-5": !elephantLeft,
                "md:col-span-2": !elephantLeft,
                "md:col-start-3": elephantLeft,
                "md:col-span-5": elephantLeft
            }
          )}>
            { 
              elephantLeft ? 
              children
              :
              <IndividualElephantContainer 
                startWhite={elephantLeft}
              />
            }
          </div>
        </div>
        </section>
    )
}

export default Section;

/*
<div key={MCQ} style={{cursor:'pointer'}} className={clsx('border-2 flex flex-col items-end border-black rounded-lg px-5 py-1',
                        {
                            'bg-elephant-bright-orange': questionSet.indexOf(MCQ) === 0,
                            'bg-elephant-red': questionSet.indexOf(MCQ) === 1,
                            'bg-elephant-orange': questionSet.indexOf(MCQ) === 2,
                            'bg-elephant-pink': questionSet.indexOf(MCQ) === 3
                        }
                     )}>
*/