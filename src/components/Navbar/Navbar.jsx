import "./navbar.css"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.svg"

const Navbar = () => {
  return (
    <>
      <nav className='navbar'>

        <img src={logo} className='logo' alt="logo do raceit"/>
        
        <ul className={"nav-links"}>
          <Link to='/' className='home'>
            <li>Home</li>
          </Link>
          <Link to='/about' className='about'>
            <li>Sobre</li>
          </Link>
          <Link to='/contact' className='contact'>
            <li>Contato</li>
          </Link>
        </ul>

        <ul className={"nav-links"}>
          <Link to='/login' className='login'>
            <li>Login</li>
          </Link>
          <Link to='/signup' className='signup'>
            <li>Cadastrar</li>
          </Link>
        </ul>        
      </nav>
    </>
  )
}
export default Navbar
