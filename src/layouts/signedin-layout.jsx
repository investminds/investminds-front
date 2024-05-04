import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const SignedInLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center bg-gray-100 h-svh">
        <div className="container flex-grow py-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SignedInLayout;
