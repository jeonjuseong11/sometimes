import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { LoginBtn, LoginEle, LoginEleInput, LoginForm, LoginWrapper } from "./Login";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      uid: email,
      pass: password,
      name: name,
    };
    try {
      const response = await axios.post(
        "https://io065rlls1.execute-api.ap-northeast-2.amazonaws.com/api/user/join",
        payload
      );
      if (response.status === 200) {
        alert("회원가입 성공!");
        navigate("/login");
      } else {
        alert("회원가입 실패...");
      }
      setEmail("");
      setPassword("");
      setName("");
    } catch (error) {
      console.error("Error occurred while sending the request:", error);
    }
  };

  return (
    <LoginWrapper>
      <div style={{ display: "flex" }}>
        <h1 style={{ margin: "0" }}>회원가입</h1>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "black",
            position: "absolute",
            right: "10px",
            top: "10px",
            fontSize: "2rem",
          }}
        >
          <AiOutlineClose />
        </Link>
      </div>
      <p>빠르고 쉽게 가입할 수 있습니다.</p>
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
        <LoginEle>
          <LoginEleInput
            type="text"
            id="name"
            value={name}
            placeholder="이름를 입력해주세요"
            onChange={(e) => setName(e.target.value)}
          />
        </LoginEle>
        <LoginBtn type="submit">가입하기</LoginBtn>
      </LoginForm>
    </LoginWrapper>
  );
};

export default Signup;
