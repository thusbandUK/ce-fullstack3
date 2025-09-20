import Image from "next/image";
import ChemistryElephantLogo from "./ui/dashboard/chemistryElephantLogo";
//import { useRef } from 'react';
import MovingElephantAnimation from "./ui/dashboard/movingElephantAnimation";

export interface anchorsInterface {
  elephantA: string;
  elephantB: string;
}

export default function Home() { 

  //const elephantADivRef = useRef<HTMLDivElement>(null);
  //const elephantBDivRef = useRef<HTMLDivElement>(null);

  const anchors: anchorsInterface = {
    elephantA: 'elephant-A-instance',
    elephantB: 'elephant-B-instance'
  }

  return (
    <div  className="w-11/12 md:w-4/5 mx-auto mt-10">
      <MovingElephantAnimation 
        anchors={anchors}
      />
      <div className="grid md:grid-cols-6 w-100 mx-auto mt-16">
        <div className="md:col-start-1 rounded-lg md:col-span-6 flex" style={{border: 'black solid 1px'}}>
          <h1 className="m-auto md:ml-10 p-5">Welcome to Chemistry Elephant</h1>
        </div>
        <div style={{border: 'black solid 1px', minHeight: '30vh'}} className="flex items-center justify-center md:col-start-1 rounded-lg md:col-end-3 ..." >
        <div className="elephant-A-anchor">

</div>
        {/**
        <ChemistryElephantLogo
              sizing={{height: "76", width: "76"}}
              elephantColour="#D98FBF"
            ></ChemistryElephantLogo>
           */}
        </div>
        
        <div className="md:col-start-3 flex rounded-lg md:col-end-7 ..." style={{border: 'black solid 1px'}}>
          <p className="p-5 m-auto md:p-10">
            Stride through chemistry with the majesty of an elephant
          </p>
          </div>

{/** start of next section*/}
<div className="md:col-start-1 rounded-lg md:col-span-6 flex mt-5" style={{border: 'black solid 1px'}}>
          <h2 className="m-auto md:ml-10 p-5">First subtitle</h2>
        </div>

        <div className="md:col-start-1 flex rounded-lg md:col-end-5 ..." style={{border: 'black solid 1px'}}>
          <p className="p-5 m-auto md:p-10">
            Stride through chemistry with the majesty of an elephant
          </p>
          </div>

        <div style={{border: 'black solid 1px', minHeight: '30vh'}} className="flex items-center justify-center md:col-start-5 rounded-lg md:col-end-7 ..." >
        
          <div className="elephant-B-anchor">

          </div>
        </div>
        
        
{/** end of next section*/}


      </div>
    </div>
  );
}

/*
<Image
            src={'/site-logo.png'} 
            alt="chemistry elephant logo"
            className="rounded-lg"
            style={{border: 'black solid 1px'}}
            width={100}
            height={100}
          >
          </Image>
          {/**
        <ChemistryElephantLogo
              sizing={{height: "76", width: "76"}}
              elephantColour="#D98FBF"
            ></ChemistryElephantLogo>
           */
