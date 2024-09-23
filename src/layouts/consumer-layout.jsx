import { Outlet } from "react-router-dom";
import SignedInNavBar from "../components/SignedInNavBar";

const ConsumerLayout = () => {
  return (
    <div className="bg-[#f7eddd] h-svh">
      <SignedInNavBar type="consumer" />
      <div className="w-full h-full px-4 py-4 overflow-auto lg:container lg:mx-auto lg:px-12">
        <Outlet />
      </div>
    </div>
  );
};

export default ConsumerLayout;
