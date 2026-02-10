

export default async function Page({ searchParams }: { searchParams: Promise<{ location: string }> }) {

    const { location } = await searchParams;

    console.log(location)
    
    return (
        <div>
            <p>Hello</p>
        </div>
    )
}