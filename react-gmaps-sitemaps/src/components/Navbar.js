import React, { useState, useEffect, useContext } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { MdTonality } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { MapContext } from "./MapContext";

function Navbar() {
  const [
    myMap,
    setMyMap,
    center,
    setCenter,
    isLoaded,
    draw,
    setDraw,
    nodes,
    setNodes,
    activeNode,
    setActiveNode,
    icon,
    setIcon,
    shapes,
    setShapes,
    checked,
    setChecked,
    selected,
    setSelected,
    color,
    setColor,
    findNode,
    removeNode,
    nodeType,
    setNodeType,
    disabled,
    setDisabled,
    editing,
    setEditing,
    editValue,
    setEditValue,
    replaceNode,
    editCleanup,
    changeIcons,
    description,
    setDescription,
    comment,
    setComment,
    label,
    setLabel,
    auth,
    setAuth,
    profileId,
    setProfileId,
    teams,
    setTeams,
    selectedTeams,
    setSelectedTeams,
    updateNodes,
    picture,
    setPicture,
  ] = useContext(MapContext);
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
    console.log("auth", auth);
    // not auth
    if (!auth.isAuthenticated) {
      return (
        <>
          <li className="nav-btn">
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
          </li>
        </>
      );
    } else {
      // is auth
      return (
        <li className="nav-btn">
          {button ? (
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
          )}
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
                <Link to="/map" className="nav-links" onClick={closeMobileMenu}>
                  Map
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
              {handleUserIsSignedIn()}
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
