import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { RiVipCrownFill } from "react-icons/ri";
import { MdPriceChange } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";

const consumerItems = (pathname, logout) => [
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
            Lista de Produtos
          </Link>
        ),
      },
    ],
  },
  {
    key: "subscription",
    label: "Assinatura",
    icon: <RiVipCrownFill size={20} />,
    children: [
      {
        key: "subscrition-plans",
        icon: <MdPriceChange size={20} />,
        label: (
          <Link
            to="/subscription"
            className={`hover:text-[#FF4773] ${
              pathname === "/subscription" && "text-[#FF4773]"
            }`}
          >
            Planos
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

export default consumerItems;
