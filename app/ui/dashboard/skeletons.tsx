// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  //border-2 border-black rounded-lg p-5
  return (
    <div
      className={`${shimmer} relative overflow-hidden`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="spacer">

      </div>
      <div className="spacer">

      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
      
    </div>
  );
}

export function ExamSkeleton() {
  //border-2 border-black rounded-lg p-5
  return (
    <div
      className={`${shimmer} relative overflow-hidden`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="spacer">
      

      </div>
      <div className="spacer">

      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
      
    </div>
  );
}
//border-2 border-black rounded-lg p-5
export function TopicsSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden border-2 border-black rounded-lg p-5`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
      
    </div>
  );

}

export default function DashboardSkeleton() {
  // className=" className="w-11/12 md:w-4/5 mx-auto mt-10""
  return (
    <>    
      <div
        className={`${shimmer}relative mb-4 h-8 w-36 overflow-hidden `}
      />
      
      <div className="grid md:grid-cols-3 gap-0 mt-10  w-11/12 md:w-4/5 mx-auto mt-10 ">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      
    </>
  );
}

/*
rounded-md bg-gray-100

<div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
*/