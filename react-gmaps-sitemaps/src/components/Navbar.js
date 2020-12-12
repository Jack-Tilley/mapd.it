import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { MdTonality } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./Navbar.css";

function Navbar() {
  const [auth, setAuth] = useContext(AuthContext);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const handleUserIsSignedIn = () => {
    // console.log("auth", auth);
    // not auth
    if (!auth.isAuthenticated) {
      return (
        <>
          <li className="nav-item">
            <Link to="/sign-up" className="nav-links" onClick={closeMobileMenu}>
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sign-in" className="nav-links" onClick={closeMobileMenu}>
              Sign In
            </Link>
          </li>
          {/* <li className="nav-btn">
            {button ? (
              <Link to="/sign-up" className="btn-link">
                <Button buttonStyle="btn--outline">SIGN UP</Button>
              </Link>
            ) : (
              <Link to="/sign-up" className="btn-link">
                <Button
                  buttonStyle="btn--outline"
                  buttonSize="btn--mobile"
                  onClick={closeMobileMenu}
                >
                  SIGN UP
                </Button>
              </Link>
            )}
          </li>
          <li className="nav-btn">
            {button ? (
              <Link to="/sign-in" className="btn-link">
                <Button buttonStyle="btn--outline">SIGN IN</Button>
              </Link>
            ) : (
              <Link to="/sign-in" className="btn-link">
                <Button
                  buttonStyle="btn--outline"
                  buttonSize="btn--mobile"
                  onClick={closeMobileMenu}
                >
                  SIGN IN
                </Button>
              </Link>
            )}
          </li> */}
        </>
      );
    } else {
      // is auth
      return (
        <li className="nav-item">
          {/* {button ? (
            <Link to="/account" className="btn-link">
              <Button buttonStyle="btn--outline">My Account</Button>
            </Link>
          ) : (
            <Link to="/account" className="btn-link">
              <Button
                buttonStyle="btn--outline"
                buttonSize="btn--mobile"
                onClick={closeMobileMenu}
              >
                My Account
              </Button>
            </Link>
          )} */}
          <Link to="/account" className="nav-links" onClick={closeMobileMenu}>
            My Account
          </Link>
        </li>
      );
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <MdTonality className="navbar-icon" />
              mapd.it
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/features"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Features
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/map" className="nav-links" onClick={closeMobileMenu}>
                  Map
                </Link>
              </li>
              {handleUserIsSignedIn()}
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
