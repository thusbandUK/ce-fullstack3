export default function LeftHandColumn({children}: {children: React.ReactNode}){

    return (
      <div className="col-start-1 col-span-6 md:col-span-4 w-full flex flex-col border border-black rounded-lg p-5">
        {children}
      </div>
    )
}