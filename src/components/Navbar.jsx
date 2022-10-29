import React, { useState, useEffect, useContext } from "react";
import logo from "../assets/logo-new.png";
import { DebountyContext } from "../context/DeBountyContext";
import {Link} from 'react-router-dom'
import "./Navbar.css";
function Navbar() {
  const [stickyClass, setStickyClass] = useState("");
  const { connectWallet, currentAccount, logout } = useContext(DebountyContext);

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight > 150 ? setStickyClass("sticky-nav") : setStickyClass("");
    }
  };
  return (
    <nav className={`${stickyClass}`}>
      <div className="left_logo">
        <Link to="/"><img src={logo} alt="" /></Link>
      </div>
      <div className="menu">
        <ul className="menuItems">
          <li>Home</li>
          <li>About</li>
          <li>Company</li>
        </ul>
        
        {currentAccount ? (
          <button onClick={logout} className="btn btn-wallet-logout">
          Logout
        </button>
        ) : (
          <button onClick={connectWallet} className="btn btn-wallet-connect">
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
