import { Link } from "react-router-dom";
import logo from "/src/assets/logo.svg";
import LocaleSwitcher from "../LocaleSwitcher";

const Navbar = () => {
  return (
    <nav className="grid h-12 grid-cols-12 bg-white shadow-md max-h-12">
      <div className="col-span-3">
        <img src={logo} className="h-12 p-2" alt="Logo do Raceit" />
      </div>
      <div className="col-span-6 ">
        <ul className="flex items-center justify-center w-full h-full space-x-4 text-md">
          <Link to="/" className="hover:text-blue-900">
            <li>Home</li>
          </Link>
          <Link to="/about" className="hover:text-blue-900">
            <li>Sobre</li>
          </Link>
          <Link to="/contact" className="hover:text-blue-900">
            <li>Contato</li>
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
