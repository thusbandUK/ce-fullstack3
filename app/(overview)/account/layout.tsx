import Footer from "@/app/ui/dashboard/footer";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: {
    template: '%s | Chemistry Elephant',
    default: 'Account'
  }
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <div className="w-full md:w-4/5 mx-auto">
        {children}
      </div>
      <Footer />
    </>
  );
}