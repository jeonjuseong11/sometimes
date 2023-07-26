import React from "react";
import "../styles.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar__logo">썸타</div>
      <div className="navbar__links">
        <button
          className="navbar_loginBtn"
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
