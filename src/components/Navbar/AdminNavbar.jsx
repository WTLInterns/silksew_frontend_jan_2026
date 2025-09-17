import React, { useState, useContext, useEffect } from "react";
import "./AdminNavbar.css";
import logo from "../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminNavbar = () => {
  // eslint-disable-next-line no-unused-vars
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [showDropdown, setShowDropdown] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // eslint-disable-next-line no-unused-vars
  const handleLogoutClick = () => {
    logout(); // Call logout from AuthContext
    navigate("/login"); // Redirect to login page
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".profile-info-container")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="navbar style">
      <div className="nav-logo">
        <img src={logo} alt="Logo" style={{marginTop:"-10px"}} />
        <p>SILKSEW</p>
      </div>
    </div>
  );
};

export default AdminNavbar;
