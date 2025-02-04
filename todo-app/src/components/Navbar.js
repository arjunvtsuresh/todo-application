import React from "react";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark mb-4">
      <div className="container d-flex align-items-center">
        <img src={logo} alt="Logo" style={{ width: "40px", marginRight: "10px" }} />
        <span className="navbar-brand">Todo</span>
      </div>
    </nav>
  );
}

export default Navbar;
