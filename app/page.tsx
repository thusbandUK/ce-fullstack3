import Image from "next/image";

export default function Home() { 

  return (
    <div  className="w-11/12 md:w-4/5 mx-auto mt-10">      
      <div className="grid grid-cols-6 w-100 mx-auto mt-16">
        <div className="col-start-1 rounded-lg col-span-6 flex" style={{border: 'black solid 1px'}}>
          <h1 className="m-auto md:ml-10 p-5">Welcome to Chemistry Elephant</h1>
        </div>
        <div className="col-start-1 rounded-lg col-end-3 ..." >
          <Image
            src={'/site-logo.png'} 
            alt="chemistry elephant logo"
            className="rounded-lg"
            style={{border: 'black solid 1px'}}
            width={100}
            height={100}
          >
          </Image>
        </div>
        
        <div className="col-start-3 flex rounded-lg col-end-7 ..." style={{border: 'black solid 1px'}}>
          <p className="p-5 m-auto md:p-10">
            Stride through chemistry with the majesty of an elephant
          </p>
          </div>
      </div>
    </div>
  );
}