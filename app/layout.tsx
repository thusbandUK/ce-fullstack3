import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./ui/dashboard/navbar";
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
//}: Readonly<{
  //children: React.ReactNode;
//}>) {
}: {
  children: React.ReactNode;
}) {
  
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