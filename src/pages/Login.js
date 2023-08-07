import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import KakaoImage from "../assets/icons/kakao_login_medium_narrow.png";
import axios from "axios";
import KakaoLogin from "../components/KakaoLogin";

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
`;
export const LoginForm = styled.form`
  width: 60%;
  margin-bottom: 1rem;
`;
export const LoginEle = styled.div`
  display: flex;
  justify-content: center;
  text-align: left;
  width: 100%;
  margin-bottom: 1rem;
`;
export const LoginEleInput = styled.input`
  padding: 1rem;
  width: 100%;
  border-radius: 50px;
  border: 1px solid #d2d2d2;
  outline: none;
`;
export const LoginBtn = styled.button`
  padding: 0.8rem;
  width: 100%;
  border-radius: 50px;
  border: 0;
  font-weight: 650;
`;
const KAKAO_LOGIN_API_URL = "https://kauth.kakao.com/oauth/authorize";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleKakaoLogin = () => {
    const clientId = "179adc4de9c40e8d6b2b1d4adc4b5451";
    const redirectUri = "https://io065rlls1.execute-api.ap-northeast-2.amazonaws.com/"; // Redirect URI 설정 필요

    const authUrl = `${KAKAO_LOGIN_API_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = authUrl;
  };
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      // userInfo가 있으면 로그인 상태로 간주하고 "/" 경로로 이동
      navigate("/");
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      uid: email,
      pass: password,
    };

    try {
      const response = await axios.post(
        "https://io065rlls1.execute-api.ap-northeast-2.amazonaws.com/api/user/login",
        payload
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      if (response.status === 200) {
        console.log("로그인 성공!");
        navigate("/");
      } else {
        console.log("로그인 실패...");
        localStorage.removeItem("userInfo");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <LoginWrapper>
      {/* <Link to="/" style={{ textDecoration: "none", color: "black" }}> */}
      <h1>썸타</h1>
      {/* </Link> */}
      <LoginForm onSubmit={handleSubmit}>
        <LoginEle>
          <LoginEleInput
            type="text"
            id="email"
            value={email}
            placeholder="아이디를 입력해주세요"
            onChange={(e) => setEmail(e.target.value)}
          />
        </LoginEle>
        <LoginEle>
          <LoginEleInput
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LoginEle>
        <LoginBtn type="submit">로그인</LoginBtn>
      </LoginForm>
      <LoginEle style={{ width: "60%" }}>
        <Link to="/signup" style={{ width: "100%" }}>
          <LoginBtn>회원가입</LoginBtn>
        </Link>
      </LoginEle>
      <div
        style={{
          backgroundColor: "#FEE500",
          width: "60%",
          borderRadius: "50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={KakaoImage} onClick={handleKakaoLogin} />
      </div>
    </LoginWrapper>
  );
};

export default Login;
