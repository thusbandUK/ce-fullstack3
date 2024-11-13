import NavLinks from './nav-links';
//import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

export default function Navbar() {
  //see clsx part below
  //const pathname = usePathname();
  return (
    <>
      <NavLinks />
    </>
  );
}

