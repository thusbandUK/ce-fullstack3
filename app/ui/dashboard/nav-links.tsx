'use client';

import Link from 'next/link';
import { useState } from 'react';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/' },
  {
    name: 'Flashcards',
    href: '/flashcards',
  },
  { name: 'About', href: '/about' },
];

export default function NavLinks({session}: {session: any}) {

  const handleToggleMenu = () => {
    const menuCheckbox = document.getElementById('menu-checkbox') as HTMLInputElement;      
    return menuCheckbox.checked = !menuCheckbox.checked;
  }
  
  let firstInitial = "";

  if (session){
    firstInitial = session.user.name.slice(0, 1).toUpperCase();
  }
  
  //const [dropMenu, setDropMenu] = useState(false);  
  
  return (
    <>    
      {links.map((link) => {        
        return (
          <Link
            key={link.name}
            href={link.href}
            className="navlink pe-0"
            prefetch={false}
            onClick={handleToggleMenu}
          >            
            <p className="text-base md:block menu-dropdown-toggle">{link.name}</p>
          </Link>
        );
      })}
      
      <Link
        href={'/account'}
        prefetch={false}
        aria-label="account button"
        onClick={handleToggleMenu}
      >
        <div className="account-icon flex justify-center">
            
           {session ? 
           
           <p className="navlink-account-button">{firstInitial}</p>
          
          :
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="50" height="50">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>     
        }

        </div>
      </Link>       
    </>
  );
}

/*
<div style={{height: "0", width: "30%", paddingBottom: "90%", marginBottom: "12%"}}>
           <div 
             className="flex items-center justify-center"
             style={{aspectRatio: "1/1", border: "solid black 1px", borderRadius: "50%"}}
           >
              <p className="text-4xl">{firstInitial}</p>
            </div>
            </div>
*/