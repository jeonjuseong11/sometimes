import React from "react";
import styled from "styled-components";

const KakaoLogin = () => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleClick = () => {
    window.location.href = kakaoURL;
  };

  return (
    <StyledContainer onClick={handleClick}>
      <StyledImage alt="카카오 로그인" src="/assets/icons/kakao_login_large_narrow.png" />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background-color: #fee500;
  width: 60%;
  border-radius: 50px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledImage = styled.img`
  height: 40px;
`;

export default KakaoLogin;
