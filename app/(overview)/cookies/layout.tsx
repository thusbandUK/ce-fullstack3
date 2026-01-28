import Footer from "@/app/ui/dashboard/footer";
import Scroll from "@/app/ui/dashboard/Scroll";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
    return (
      <>
      <Scroll />
      <div className="w-full md:w-4/5 mx-auto mt-5">
        {children}
      </div>
      <Footer />
      </>
    );
  }