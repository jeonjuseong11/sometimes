import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const KakaoCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/home");
    }

    const code = new URLSearchParams(location.search).get("code");
    if (code) {
      // 디바운스 처리된 함수 호출
      debounceHandleKakaoLogin(code);
    }
  }, [navigate, location]);

  const handleKakaoLogin = async (code) => {
    try {
      const response = await axios.post(`http://localhost:8002/oauth/kakao?code=${code}`);

      const userData = response.data.data;
      const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;
      const encryptedUserData = encryptData(JSON.stringify(userData), encryptionKey);
      localStorage.setItem("userInfo", encryptedUserData);
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
      alert("카카오 로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const encryptData = (data, key) => {
    const encryptedData = btoa(unescape(encodeURIComponent(data + key)));
    return encryptedData;
  };

  // 디바운스 함수 생성
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // handleKakaoLogin 함수에 디바운스 적용
  const debounceHandleKakaoLogin = debounce(handleKakaoLogin, 1000); // 딜레이 시간 설정

  return <div>로그인중...</div>;
};

export default KakaoCallback;
