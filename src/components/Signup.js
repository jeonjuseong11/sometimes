import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
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
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      uid: email,
      pass: password,
      name: name,
    };
    try {
      const response = await fetch("http://localhost:8080/api/user/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert("회원가입 성공!");
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
