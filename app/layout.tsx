import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./ui/dashboard/navbar";
import CELogoContainer from "./ui/dashboard/cELogoContainer";
 
const akkurat = localFont({
  src: '../public/fonts/Akkurat-Light.woff2',
  variable: "--font-akkurat"
})

export const metadata: Metadata = {
  title: "Chemistry Elephant",
  description: "Learn chemistry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      
      <body
        className={`${akkurat.className} antialiased bg-white`}
      >
        <CELogoContainer />          
        <header>
          <Navbar />
        </header>                     
        <main className="bg-white">
          {children}
        </main>
        
      </body>
      
    </html>
  );
}