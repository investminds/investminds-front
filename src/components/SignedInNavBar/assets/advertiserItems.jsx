import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaCirclePlus } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { FaFacebookSquare } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";

const advertiserItems = (pathname, logout) => [
  {
    key: "profile",
    icon: <IoPersonCircle size={20} />,
    label: (
      <Link
        to="/profile"
        className={`hover:text-[#FF4773] ${
          pathname === "/profile" && "text-[#FF4773]"
        }`}
      >
        Perfil
      </Link>
    ),
  },
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
    icon: <CiLogout size={20} onClick={logout} />,
    label: "Sair",
  },
];

export default advertiserItems;
