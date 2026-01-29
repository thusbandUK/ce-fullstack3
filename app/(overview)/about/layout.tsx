import Footer from "@/app/ui/dashboard/footer";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'About',
  description: 'Why Chemistry Elephant? Who are we for? How can we help?'
}

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
    return (
      <>
      <div className="w-full md:w-4/5 mx-auto mt-5">
        {children}
      </div>
      <Footer />
      </>
    );
  }