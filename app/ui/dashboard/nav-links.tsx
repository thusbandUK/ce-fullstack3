'use client';

//all the commented out have potential value

/*import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';*/
//import { usePathname } from 'next/navigation';
//import clsx from 'clsx';
import Link from 'next/link';
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
  
  return (
    <>    
      {links.map((link) => {
        //const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="navlink"
          >            
            <p className="hidden md:block menu-dropdown-toggle">{link.name}</p>
          </Link>
        );
      })}
      <Link
        href={'/account'}
      >
        <div className="account-icon flex justify-center">
          {session ? 
          <Image
            src={session.user.image}
            alt=""
            width={50}
            height={50}
            style={{border: 'black solid 1px', borderRadius: '50%'}}
          ></Image>
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
//this was from the svg for the account icon
className="size-6"

This was a link prop:

className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}



<LinkIcon className="w-6" />*/