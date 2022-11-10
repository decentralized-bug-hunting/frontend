import React, { useState, useEffect, useContext } from "react";
import logo from "../assets/logo-new.png";
import { DebountyContext } from "../context/DeBountyContext";
import {NavLink, Link} from 'react-router-dom'
import "./Navbar.css";
function Navbar() {
  const [stickyClass, setStickyClass] = useState("");
  const { connectWallet, currentAccount, logout, validHunter, validCompany } = useContext(DebountyContext);

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
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/all-issues">All Issues</NavLink></li>
          <li><NavLink to="/getstarted">Get started</NavLink></li>
          {
            (validCompany || validHunter) && (
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            )
          }
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
