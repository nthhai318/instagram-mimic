import Header from "~/Layout/Header";
import Navbar from "~/Layout/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row-reverse">
      <div className="md:hidden">
        <Header />
      </div>
      <main className="flex flex-1">{children}</main>
      <div className="">
        <Navbar />
      </div>
    </div>
  );
}
