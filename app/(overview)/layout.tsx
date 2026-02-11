import Navbar from "../ui/dashboard/navbar";
//import type { Metadata } from 'next'
 /*
export const metadata: Metadata = {
  title: {
    //absolute: 'About',
    template: '%s | Chemistry Elephant',
    default: 'Chemistry Elephant'
  },
}
*/
function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
           <>
             <header>
               <Navbar />
             </header>                     
             <main className="bg-white">
              <div  className="w-full mx-auto md:mt-10 p-2">
               {children}
               </div>
             </main>
           </>
  )
}

export default Layout;