import type { Metadata } from "next";
import localFont from "next/font/local";
//NOTE: globals (below) should ONLY be imported to this layout, not descendent layout components
import "./globals.css";
import CELogoContainer from "./ui/dashboard/cELogoContainer";
import Providers from "./providers";
 
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
//}: {
  //children: React.ReactNode;
//}) {
  
  return (
    <html lang="en">
      
      <body
        className={`${akkurat.className} antialiased bg-white`}
      >
        <CELogoContainer />          
        
          <Providers>
            {children}
          </Providers>
          
        
      </body>
      
    </html>
  );
}