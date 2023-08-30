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
`;

export const LoginEle = styled.div`
  display: flex;
  justify-content: center;
  text-align: left;
  width: 100%;
  margin-top: 0.5rem;
`;

export const LoginEleInput = styled.input`
  padding: 1rem;
  width: 100%;
  border-radius: 50px;
  border: 1px solid ${(props) => (props.hasError ? "red" : "#d2d2d2")};
  outline: none;
`;

export const LoginBtn = styled.button`
  padding: 0.8rem;
  margin-top: 0.5rem;
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
      navigate("/home");
    }
  }, [navigate, location]);

  const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

  const encryptData = (data, key) => {
    const encryptedData = btoa(unescape(encodeURIComponent(data + key)));
    return encryptedData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    const payload = {
      uid: email,
      pass: password,
    };

    try {
      const response = await axios.post(
        "https://io065rlls1.execute-api.ap-northeast-2.amazonaws.com/api/user/login",
        payload
      );

      if (response.status === 200) {
        const userData = response.data;
        const encryptedUserData = encryptData(JSON.stringify(userData), encryptionKey);
        localStorage.setItem("userInfo", encryptedUserData);
        console.log("로그인 성공!");
        navigate("/home");
      } else {
        console.log("로그인 실패...");
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
      <h1 style={{ margin: "0" }}>스쿨메가폰</h1>
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
      <Link to="/signup" style={{ width: "60%" }}>
        <LoginBtn>회원가입</LoginBtn>
      </Link>
      <LoginEle>
        <KakaoLogin />
      </LoginEle>
    </LoginWrapper>
  );
};

export default Login;
