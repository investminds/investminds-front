import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ConsumerNavbar from "../components/ConsumerNavBar";
import { useSelector } from "react-redux";

const SignedInLayout = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="bg-[#f7eddd] min-h-svh">
      {user?.role === "consumer" ? <ConsumerNavbar /> : <Navbar />}
      <div className="px-4 py-4 overflow-auto lg:container lg:mx-auto lg:px-12">
        <Outlet />
      </div>
    </div>
  );
};

export default SignedInLayout;
