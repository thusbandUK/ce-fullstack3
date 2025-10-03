//import SideNav from '@/app/ui/dashboard/sidenav';
import { signOut } from '@/auth';
import styles from '../ui/button.module.css';
//import NavLinks from '../ui/dashboard/nav-links';

//export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div >
      <div>        
      </div>
      <div >{children}</div>
    </div>
  );
}


/**
 * <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className={styles.button}>            
            <div >Sign Out</div>
          </button>
        </form>
 */