import { InitiateSignIn } from '../../ui/initiateSignIn';
import HeaderDivs from '../../ui/dashboard/header';

export default async function Page({ searchParams }: { searchParams: Promise<{ location: string }> }) {

    const { location } = await searchParams;
       
    return (
        <div>
            
            <InitiateSignIn
              location={location ? location : ''}
              error={false}
            />
        </div>
    )
}