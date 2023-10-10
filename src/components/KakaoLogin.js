import React, { useState } from "react";

const KakaoLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize";
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  const handleKakaoLoginClick = () => {
    setIsLoggingIn(true);
    const kakaoURL = `${KAKAO_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoURL;
  };

  return (
    <div
      style={{
        backgroundColor: "#FEE500",
        width: "60%",
        borderRadius: "50px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        alt="카카오 로그인"
        height={40}
        src="/assets/icons/kakao_login_large_narrow.png"
        onClick={handleKakaoLoginClick}
        style={{ cursor: isLoggingIn ? "default" : "pointer", opacity: isLoggingIn ? 0.5 : 1 }}
      />
    </div>
  );
};

export default KakaoLogin;
