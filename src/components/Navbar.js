import React, { useState } from "react";
import { ReactComponent as CloseMenu } from "../assets/logo.svg";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import { ReactComponent as Logo } from "../assets/logo.svg";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <div className="header">
      <div className="logo-nav">
        <div className="logo-container">
          <Link to="/home">
            <Logo className="logo" />
          </Link>
        </div>
        <ul className={click ? "nav-options active" : "nav-options"}>
          <li className="option" onClick={closeMobileMenu}>
            <Link to="/tabledata">Coustomer Data</Link>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <Link to="/createpage">BLOG</Link>
          </li>
          <li className="option mobile-option" onClick={closeMobileMenu}>
            <Link to="#">Account</Link>
          </li>
          <li className="option mobile-option" onClick={closeMobileMenu}>
            <Link to="" className="sign-up">
              Log out
            </Link>
          </li>
        </ul>
      </div>
      <div class="search-container">
        <form>
          <input type="text" placeholder="Search.." name="search" />
          <Link>
            <button
              type="submit"
              id="search-button"
              // style={{ backgroundColor: "transparent" }}
            >
              &#128269;
            </button>
          </Link>
        </form>
      </div>
      <div className="mobile-menu" onClick={handleClick}>
        {click ? (
          <CloseMenu className="menu-icon" />
        ) : (
          <MenuIcon className="menu-icon" />
        )}
      </div>
      <ul className="signin-up">
        <li className="sign-in" onClick={closeMobileMenu}>
          <Link to="#">
            <img
              src="https://avatars.githubusercontent.com/u/111152286?v=4"
              alt="img"
              style={{ width: "50px", borderRadius: "50%" }}
            />
          </Link>
        </li>
        <li onClick={closeMobileMenu}>
          <Link to="" className="signup-btn">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
