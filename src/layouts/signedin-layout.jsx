import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const SignedInLayout = () => {
  return (
    <>
      <Navbar />
      <div className="container h-screen bg-green-200">
        <Outlet />
      </div>
    </>
  );
};

export default SignedInLayout;
