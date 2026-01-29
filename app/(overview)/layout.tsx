import Navbar from "../ui/dashboard/navbar";

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