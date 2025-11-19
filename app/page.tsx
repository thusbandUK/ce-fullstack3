import Link from "next/link";
import Navbar from "./ui/dashboard/navbar";

import dynamic from 'next/dynamic';
const IndividualElephantContainer = dynamic(() => import('./animation/individualElephantContainer'), { ssr: false });

export default function Home() {  

  return (
    <>
      <header>
        <Navbar />
      </header>                     
      <main className="bg-white">
      <div className="w-full md:w-4/5 mx-auto md:mt-10 p-2">
        <div className="grid md:grid-cols-6 w-100 mx-auto mt-16">
          <div className="md:col-start-1 rounded-lg md:col-span-6 flex" style={{border: 'black solid 1px'}}>
            <h1 className="m-auto md:ml-10 p-5">Welcome to Chemistry Elephant</h1>
          </div>
          <div style={{border: 'black solid 1px', minHeight: '30vh'}} className="flex items-center justify-center md:col-start-1 rounded-lg md:col-end-3 ..." >
            <div>       
              <IndividualElephantContainer 
                startWhite={true}
                sizeModifier={0.15}
              />
            </div>       
          </div>
       
          <div className="md:col-start-3 flex rounded-lg md:col-end-7 ..." style={{border: 'black solid 1px'}}>
            <p className="p-5 m-auto md:p-10 text-lg">
              Stride through chemistry with the majesty of an elephant
            </p>
          </div>

          {/** start of next section*/}
          <div className="md:col-start-1 rounded-lg md:col-span-6 flex mt-5" style={{border: 'black solid 1px'}}>
            <h2 className="m-auto md:ml-10 p-5">Learn chemistry</h2>
          </div>

          <div className="md:col-start-1 flex rounded-lg md:col-end-5 ..." style={{border: 'black solid 1px'}}>
            <p className="p-5 m-auto md:p-10 text-lg">
              So how difficult is A-level chemistry? Easier now you&#39;ve found Chemistry Elephant. Check out the flashcards section, where you can practice multiple choice questions while memorising core content. Coming soon: a blog with hints and tips for chemistry success and online courses. Sign up for our 
              <Link
                href='/account/receive-email?location=/'
                className="font-bold hover:underline active:text-red"
              > newsletter </Link> 
              to be the first to hear about new content.            
            </p>
          </div>

          <div style={{border: 'black solid 1px', minHeight: '30vh'}} className="flex items-center justify-center md:col-start-5 rounded-lg md:col-end-7 ..." >
            <IndividualElephantContainer
              startWhite={false}
              sizeModifier={0.15}
            />
          </div>
        </div>
        </div>

      {/** end of next section*/}

      </main>
    </>
  );
}