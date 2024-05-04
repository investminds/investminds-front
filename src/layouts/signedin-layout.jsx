import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const SignedInLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default SignedInLayout;
