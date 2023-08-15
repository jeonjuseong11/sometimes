import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      // userInfo가 있으면 로그인 상태로 간주하고 "/" 경로로 이동
      navigate("/home");
    }

    const code = new URLSearchParams(location.search).get("code");
    if (code) {
      // 프론트엔드에서 받아온 코드를 백엔드에 전송하여 처리하는 로직
      handleKakaoLogin(code);
    }
  }, [navigate, location]);

  const handleKakaoLogin = async (code) => {
    try {
      // 백엔드로 code를 전송하여 카카오 API와 연동하여 사용자 정보를 받아옴
      const response = await axios.post(
        "http://localhost:8002/oauth/kakao", // 실제 백엔드의 API URL로 변경
        { code }
      );

      // 받아온 사용자 정보를 로컬 스토리지에 저장하고 로그인 후 홈 화면으로 이동
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
      alert("카카오 로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

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
        navigate("/home");
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
      <h1>썸타</h1>
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
      <LoginEle>
        <KakaoLogin />
      </LoginEle>
    </LoginWrapper>
  );
};

export default Login;
