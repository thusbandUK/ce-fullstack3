

import { signOut } from '@/auth';
import styles from '../button.module.css';


export default async function SignOut () {
    return (
        <div>
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
        </div>
    )
}