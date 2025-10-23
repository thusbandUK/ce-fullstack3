export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="w-full md:w-4/5 mx-auto">
      {children}
    </div>
  );
}