import React from "react";
import { NavLink, Link } from "react-router-dom";
import auth from "../services/authService";
//import logo from "../logo.png";
const NavBar = ({ user }) => {
  const handleLogout = () => {
    auth.logout();
    sessionStorage.setItem("logoutMessage", "You successfully logged out.");
    window.location = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        {/* <Image src={logo} /> */}
        Belgrade card
      </Link>
      <div className="collapse navbar-collapse">
        <div className="d-flex justify-content-between w-100">
          <div className="navbar-nav">
            <NavLink to="/" className="nav-item nav-link">
              Home
            </NavLink>
            {user && user.userType === "member" && (
              <NavLink to="/members" className="nav-item nav-link">
                Members
              </NavLink>
            )}
            {user && user.userType === "partner" && (
              <NavLink to="/partners" className="nav-item nav-link">
                Partners
              </NavLink>
            )}
          </div>
          {user && (
            <button onClick={handleLogout} className="btn btn-outline-primary">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
