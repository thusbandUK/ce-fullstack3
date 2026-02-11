import { InitiateSignIn } from '../../ui/initiateSignIn';
import HeaderDivs from '../../ui/dashboard/header';

export default async function Page({ searchParams }: { searchParams: Promise<{ location: string }> }) {

    const { location } = await searchParams;
       
    return (
        <div>
            <HeaderDivs h1Content='Sign in or sign up' />
            <InitiateSignIn
              location={location ? location : ''}
              error={false}
            />
        </div>
    )
}