import NavLinks from './nav-links';
import Image from 'next/image';
import { signOut } from '@/auth';
import styles from '../button.module.css';

//import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

export default function Navbar() {
  //see clsx part below
  //const pathname = usePathname();
  return (
    <>
      <div className="flex w-full navbar-container">
        <Image 
          src="/site-logo.png" alt="chemistry elephant logo"
          width={100}
          height={76}
        />
      <div className="flex navbar-links-container">
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
          className="navlink"
        >
          <button className={styles.button}>            
            <div >Sign Out</div>
          </button>
        </form>
    
      <NavLinks />
      </div>
      </div>
    </>
  );
}

