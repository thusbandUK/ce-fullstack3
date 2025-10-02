import "../globals.css";
import Navbar from "../ui/dashboard/navbar";

function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
           <>
             <header>
               <Navbar />
             </header>                     
             <main className="bg-white">
              <div  className="w-full md:w-4/5 mx-auto md:mt-10 p-2">
               {children}
               </div>
             </main>
           </>
  )
}

export default Layout;