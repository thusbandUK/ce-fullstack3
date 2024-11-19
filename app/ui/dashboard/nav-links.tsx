'use client';

/*import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';*/
import Link from 'next/link';
import { usePathname } from 'next/navigation';
//import clsx from 'clsx';
import { useState } from 'react';
import Image from 'next/image';



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
  //see clsx part below
  //const pathname = usePathname();
  
  const [dropMenu, setDropMenu] = useState(false);

  console.log(session);
  
  const dropMenuStyle = {
    display: dropMenu ? 'flex' : 'none',
    flexDirection: dropMenu? 'column' : 'row'
    //padding: show ? '10px' : '0px'
}    

  const handleDropDown = () => {
    return setDropMenu(!dropMenu);
  }
  return (
    

    <>
    <button
        onClick={handleDropDown}
      >Press here</button>
      
    
      {links.map((link) => {
        //const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="navlink"
          >            
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
      <Link
        href={'/account'}
      >
        <div className="account-icon">
          {session ? 
          <Image
            src={session.user.image}
            alt=""
            width={50}
            height={50}
            style={{border: 'black solid 1px', borderRadius: '50%'}}
          ></Image>
          :
          null
          
        
        }

        </div>
      </Link>
         
    </>
  );
}

/*

<div className="navbar-links-container-inner" style={dropMenuStyle}></div>

This was a link prop:

className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}



<LinkIcon className="w-6" />*/