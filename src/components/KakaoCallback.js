import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const KakaoCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const encryptData = useCallback((data, key) => {
    const encryptedData = btoa(unescape(encodeURIComponent(data + key)));
    return encryptedData;
  }, []);

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");

    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/home");
      return;
    }

    const handleKakaoLogin = async (code) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `https://io065rlls1.execute-api.ap-northeast-2.amazonaws.com/oauth/kakao?code=${code}`
          // `http://localhost:8002/oauth/kakao?code=${code}`
        );

        const userData = response.data.data;
        const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

        if (userData && encryptionKey) {
          const encryptedUserData = encryptData(JSON.stringify(userData), encryptionKey);
          localStorage.setItem("userInfo", encryptedUserData);
          navigate("/home");
        } else {
          throw new Error("Invalid user data or encryption key");
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("카카오 로그인에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    };

    if (code) {
      handleKakaoLogin(code);
    } else {
      setErrorMessage("Authorization code not found");
      setIsLoading(false);
    }
  }, [location.search, navigate, encryptData]);

  if (isLoading) {
    return <div style={{ margin: "0 auto" }}>로그인 중...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return null;
};

export default KakaoCallback;
