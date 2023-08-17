import React from "react";
import axios from "axios";

const KakaoLogin = () => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  const handleKakaoLoginClick = async () => {
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    try {
      // 로그인 버튼을 클릭하여 카카오 인증 화면으로 이동
      window.location.href = kakaoURL;
    } catch (error) {
      console.error("Error:", error);
      alert("카카오 로그인에 실패했습니다. 다시 시도해주세요.");
    }
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
      />
    </div>
  );
};

export default KakaoLogin;
