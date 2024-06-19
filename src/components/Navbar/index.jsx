import { Link, useLocation } from "react-router-dom";
import logo from "/src/assets/logo.svg";
import LocaleSwitcher from "../LocaleSwitcher";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="grid h-16 grid-cols-12 bg-white shadow-md max-h-16">
      <div className="col-span-3">
        <img src={logo} className="h-12 pt-3 pl-3" alt="Logo do Raceit" />
      </div>
      <div className="col-span-6 ">
        <ul className="flex items-center justify-center w-full h-full space-x-4 text-md">
          <Link
            to="/"
            className={`hover:text-[#FF4773] ${
              pathname === "/" && "text-[#FF4773]"
            }`}
          >
            <li>Home</li>
          </Link>
          <Link
            to="/about"
            className={`hover:text-[#FF4773] ${
              pathname === "/about" && "text-[#FF4773]"
            }`}
          >
            <li>Sobre</li>
          </Link>
          <Link
            to="/facebook"
            className={`hover:text-[#FF4773] ${
              pathname === "/facebook" && "text-[#FF4773]"
            }`}
          >
            <li>Cadastro Facebook</li>
          </Link>
          <Link
            to="/login"
            className={`hover:text-[#FF4773] ${
              pathname === "/login" && "text-[#FF4773]"
            }`}
          >
            <li>Login</li>
          </Link>
          <Link
            to="/signup"
            className={`hover:text-[#FF4773] ${
              pathname === "/signup" && "text-[#FF4773]"
            }`}
          >
            <li>Cadastre-se</li>
          </Link>
        </ul>
      </div>
      <div className="flex items-center justify-center col-span-3 space-x-2 ">
        <div className="w-1/2 h-10">
          <LocaleSwitcher />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
