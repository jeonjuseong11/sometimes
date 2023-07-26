import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState("게시물");
  const location = useLocation();

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };
  useEffect(() => {
    // 라우터의 주소가 "/notification"이면 공지 메뉴를 선택하도록 합니다.
    // 그 외에는 "/notification"이 아니면 게시물 메뉴를 선택하도록 합니다.
    setSelectedMenu(location.pathname === "/notification" ? "공지" : "게시물");
  }, [location.pathname]);
  return (
    <div style={{ margin: "0" }}>
      <Navbar />
      <div style={{ marginBottom: "1rem" }}>
        <div
          style={{
            backgroundColor: "#f2f2f2",
            height: "10rem",
            borderRadius: "0 0 10px 10px",
          }}
        ></div>
        <div
          style={{
            backgroundColor: "white",
            textAlign: "center",
            height: "5rem",
          }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: "100px",
              backgroundColor: "gray",
              margin: "0 auto 20px",
              width: "10rem",
              height: "10rem",
              top: "-5rem",
              border: "5px solid white",
            }}
          >
            이미지
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <h3>Sometimes</h3>
          <p>
            학생들의 의견을 자유롭게 소통하기 위해 <br />
            제작된 서비스 입니다 <br /> 우리 학교에 관한 모든 것을 전해
            드립니다!
            <br />
            [익명제보,맛집,알바,거래,소식 등등] <br />
            우리 학교의 특별한 이야기를 보러오세요!
          </p>
        </div>
      </div>
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
              className={selectedMenu === "공지" ? "active" : ""}
              onClick={() => handleMenuClick("공지")}
              style={{
                color: selectedMenu === "공지" ? "#007bff" : "black",
              }}
            >
              공지
            </li>
          </Link>
          {/* <li
          className={selectedMenu === "사진" ? "active" : ""}
          onClick={() => handleMenuClick("사진")}
        >
          사진
        </li> */}
        </ul>
      </div>
      <main>
        <div className="app__body">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Menu;
