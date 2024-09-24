import { useState } from "react";
import { Link, redirect, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetState } from "../../store/reducers/user";
import { Button, Menu } from "antd";
import { IoMdHome } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaCirclePlus } from "react-icons/fa6";
import { FaGripLinesVertical } from "react-icons/fa";
import { FaGripLines } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { FaFacebookSquare } from "react-icons/fa";
import { BsFilePost } from "react-icons/bs";

const items = (pathname, logout) => [
  {
    key: "1",
    icon: <IoMdHome size={20} />,
    label: (
      <Link
        to="/"
        className={`hover:text-[#FF4773] ${
          pathname === "/" && "text-[#FF4773]"
        }`}
      >
        Home
      </Link>
    ),
  },
  {
    key: "sub1",
    label: "Produtos",
    icon: <FaClipboardList size={20} />,
    children: [
      {
        key: "5",
        icon: <AiFillProduct size={20} />,
        label: (
          <Link
            to="/products"
            className={`hover:text-[#FF4773] ${
              pathname === "/products" && "text-[#FF4773]"
            }`}
          >
            Seus Produtos
          </Link>
        ),
      },
      {
        key: "6",
        icon: <FaCirclePlus size={20} />,
        label: (
          <Link
            to="/products/create"
            className={`hover:text-[#FF4773] ${
              pathname === "/products/create" && "text-[#FF4773]"
            }`}
          >
            Criar Produtos
          </Link>
        ),
      },
    ],
  },
  {
    key: "campanhas",
    label: "Publicações",
    icon: <FaFacebookSquare size={20} />,
    children: [
      {
        key: "criar-publicacao",
        icon: <FaCirclePlus size={20} />,
        label: (
          <Link
            to="/publications/create"
            className={`hover:text-[#FF4773] ${
              pathname === "/publications/create" && "text-[#FF4773]"
            }`}
          >
            Criar Publicação
          </Link>
        ),
      },
    ],
  },
  {
    key: "logout",
    icon: <CiLogout size={20} onClick={() => logout()} />,
    label: "Sair",
  },
];

const AdvertiserNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("threadId");
    dispatch(resetState());
    navigate("/", { replace: true });
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
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items(pathname, handleLogout)}
      />
    </nav>
  );
};

export default AdvertiserNavBar;
