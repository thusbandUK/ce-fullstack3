import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./ui/dashboard/navbar";

 
const akkurat = localFont({
  src: '../public/fonts/Akkurat-Light.woff2',
  variable: "--font-akkurat"
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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

// className="w-11/12 md:w-4/5 mx-auto mt-10"