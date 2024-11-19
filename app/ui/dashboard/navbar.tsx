import NavLinks from './nav-links';
import Image from 'next/image';
import SignOut from './signOut';
import { auth } from '@/auth';


//import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

export default async function Navbar() {
  //see clsx part below
  //const pathname = usePathname();
  //console.log(session);
  const session: any = await auth();
  
  return (
    <>
      <div className="flex w-full navbar-container">
        <Image 
          src="/site-logo.png" alt="chemistry elephant logo"
          width={100}
          height={76}
        />
      <div className="flex navbar-links-container my-auto">
        
    
      
      <NavLinks 
        session={session}
      />
      
      
      
      </div>
      </div>
    </>
  );
}

//{session ? <SignOut /> : null}