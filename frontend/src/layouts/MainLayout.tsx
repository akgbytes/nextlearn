import Navbar from "@/components/navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

//  className="mx-auto max-w-7xl px-6 lg:px-8 space-y-20"
