import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { decryptData } from "../utils/decryptData";

const Navbar = () => {
  const navigate = useNavigate();
  const [userNick, setUserNick] = useState(""); // 사용자 닉네임 상태 변수
  const [showMenu, setShowMenu] = useState(false);

  // useEffect를 사용하여 페이지 로드 시 userInfo가 있는지 검사하여 처리
  useEffect(() => {
    const encryptedUserInfo = localStorage.getItem("userInfo");
    const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;
    if (encryptedUserInfo) {
      const decryptedUserInfo = decryptData(encryptedUserInfo, encryptionKey); // 암호화 키 사용
      const parsedUserInfo = JSON.parse(decryptedUserInfo);
      if (parsedUserInfo.user_NICK) {
        // 사용자 닉네임이 있으면 로그인 상태로 간주하여 닉네임 표시
        setUserNick(parsedUserInfo.user_NICK);
      }
    }
  }, []);

  // 로그아웃 버튼을 클릭했을 때 처리하는 함수
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    // 쿠키 삭제 로직...
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    setUserNick("");
    navigate("/");
  };

  return (
    <nav
      className="navbar"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <div className="navbar__logo">스쿨메가폰</div>
      <div className="navbar__links" style={{ position: "relative" }}>
        {userNick ? ( // userNick이 있으면 로그인 상태이므로 닉네임과 로그아웃 버튼 표시
          <div className="navbar__user-info ">
            <span className="navbar__userNick">{userNick}</span>
            {showMenu && (
              <div
                className="navbar__dropdown-menu"
                style={{
                  position: "absolute",
                  top: "100%",
                  marginTop: ".5rem",
                  right: 0,
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  width: "10rem",
                  zIndex: 2,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                <button className="navbar__logoutBtn" onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          // userNick이 없으면 로그인 상태가 아니므로 로그인 버튼 표시
          <Link to="/" style={{ textDecoration: "none" }}>
            <button className="navbar__loginBtn" type="button">
              로그인
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
