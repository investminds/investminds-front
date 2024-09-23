import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetState } from "../../store/reducers/user";
import advertiserItems from "./assets/advertiserItems";
import consumerItems from "./assets/consumerItems";
import { Button, Menu } from "antd";
import { FaGripLinesVertical } from "react-icons/fa";
import { FaGripLines } from "react-icons/fa";

const SignedInNavBar = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("threadId");
    dispatch(resetState());
    navigate("/");
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <nav
      className={`absolute flex flex-col h-screen transition-all duration-300 ease-in-out bg-white shadow-md z-50`}
    >
      <Button
        className="h-12 rounded-none bg-[#FF4773]"
        type="primary"
        onClick={toggleCollapsed}
      >
        {collapsed ? (
          <FaGripLinesVertical size={20} />
        ) : (
          <FaGripLines size={20} />
        )}
      </Button>
      <Menu
        defaultSelectedKeys={["profile"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={
          type === "advertiser"
            ? advertiserItems(pathname, handleLogout)
            : consumerItems(pathname, handleLogout)
        }
      />
    </nav>
  );
};

export default SignedInNavBar;
