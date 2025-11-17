export default function RightHandColumn({children}: {children: React.ReactNode}){

    return (
        <div className="col-start-1 md:col-start-5 h-full col-span-6 md:col-span-2 border border-black rounded-lg flex flex-col justify-end">
          {children}
        </div>
    )
}