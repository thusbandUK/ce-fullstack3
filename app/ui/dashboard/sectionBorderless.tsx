import clsx from "clsx"
export default function SectionBorderless({children}: {children: React.ReactNode}){

    return (
        <div  className="md:grid md:grid-cols-6 gap-0 w-full items-center justify-center rounded-lg mt-[40] p-5">
            <div className={clsx("md:col-start-2 md:col-span-6")}>
              {children}
            </div>
        </div>
    )
}