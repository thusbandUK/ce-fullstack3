//import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import LoginForm2 from '../ui/login-form2';
//import { getSearchResults } from '@/lib/search'
 

 
export default function LoginPage({ searchParams }: { searchParams: { location: string } }) {

//console.log(params.location);
//console.log(searchParams.location)

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <p>Chemistry Elephant</p>
          </div>
        </div>
        <LoginForm2 
          location={searchParams.location ? searchParams.location : null}
        />
      </div>
    </main>
  );
}