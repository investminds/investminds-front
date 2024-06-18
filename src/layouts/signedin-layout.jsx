import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const SignedInLayout = () => {
  return (
    <div className="bg-[#f7eddd] min-h-svh">
      <Navbar />
      <div className="px-4 py-4 overflow-auto lg:container lg:mx-auto lg:px-12">
        <Outlet />
      </div>
    </div>
  );
};

export default SignedInLayout;
