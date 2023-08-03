import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState("게시물");
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  useEffect(() => {
    // 라우터의 주소에 따라서 선택된 메뉴를 변경합니다.
    if (location.pathname === "/notification") {
      setSelectedMenu("내가 쓴 글");
    } else if (location.pathname === "/approval") {
      setSelectedMenu("승인");
    } else {
      setSelectedMenu("게시물");
    }
  }, [location.pathname]);

  return (
    <div style={{ margin: "0" }}>
      <Navbar />
      <div className="menu">
        <ul className="menu-list">
          <Link to="/" style={{ textDecoration: "none" }}>
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
          <Link to="/notification" style={{ textDecoration: "none" }}>
            <li
              className={selectedMenu === "내가 쓴 글" ? "active" : ""}
              onClick={() => handleMenuClick("내가 쓴 글")}
              style={{
                color: selectedMenu === "내가 쓴 글" ? "#007bff" : "black",
              }}
            >
              내가 쓴 글
            </li>
          </Link>
          {/* 사용자 역할이 1일 때만 "승인 대기" 메뉴를 표시합니다. */}
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
