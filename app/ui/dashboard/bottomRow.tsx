export default function BottomRow({children}: {children: React.ReactNode}){

    return (
        <div  className="md:grid md:grid-cols-6 gap-0 w-full items-center justify-center rounded-lg">
            {children}
        </div>
    )
}