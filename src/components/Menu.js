import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { decryptData } from "../utils/decrypyData";
import Navbar from "./Navbar";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState("게시물");
  const location = useLocation();
  const encryptedUserInfo = localStorage.getItem("userInfo");
  const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

  // 복호화된 유저 정보를 가져오기 (null 또는 undefined일 경우를 처리)
  const decryptedUserInfo = encryptedUserInfo
    ? decryptData(encryptedUserInfo, encryptionKey)
    : null;

  const userInfo = decryptedUserInfo ? JSON.parse(decryptedUserInfo) : null;

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  useEffect(() => {
    if (location.pathname === "/approval") {
      setSelectedMenu("승인");
    } else if (location.pathname === "/home") {
      setSelectedMenu("게시물");
    }
  }, [location.pathname]);

  return (
    <div style={{ margin: "0", backgroundColor: "white" }}>
      <Navbar />
      <div className="menu">
        <ul className="menu-list">
          <Link to="/home" style={{ textDecoration: "none" }}>
            <li
              className={selectedMenu === "게시물" ? "active" : ""}
              onClick={() => handleMenuClick("게시물")}
              style={{
                color: selectedMenu === "게시물" ? "#007bff" : "black",
              }}
            >
              게시물
            </li>
          </Link>
          {userInfo && userInfo.user_ROLE === 1 && (
            <Link to="/approval" style={{ textDecoration: "none" }}>
              <li
                className={selectedMenu === "승인" ? "active" : ""}
                onClick={() => handleMenuClick("승인")}
                style={{
                  color: selectedMenu === "승인" ? "#007bff" : "black",
                }}
              >
                승인 대기
              </li>
            </Link>
          )}
        </ul>
      </div>
      <main>
        <div className="app__body" style={{ background: "#f2f2f2" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Menu;
