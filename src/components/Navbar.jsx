import React, {useState, useEffect} from 'react'
import logo from '../assets/logo-new.png'
import './Navbar.css'
function Navbar() {
  const [stickyClass, setStickyClass] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);
    return () => window.removeEventListener('scroll', stickNavbar);
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight > 150 ? setStickyClass('sticky-nav') : setStickyClass('');
    }
  };
  return (
    <nav className={`${stickyClass}`}>
        <div className="left_logo">
            <img src={logo} alt="" />
        </div>
        <div className="menu">
            <ul className="menuItems">
                <li>Home</li>
                <li>About</li>
                <li>Company</li>
                <li>Login</li>
            </ul>
            <button className="btn btn-wallet-connect">Connect Wallet</button>
        </div>
    </nav>
  )
}

export default Navbar