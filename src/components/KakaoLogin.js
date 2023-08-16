const KakaoLogin = () => {
  const CLIENT_ID = `af3012c5962e39aa160c3e21392445c3`;
  // const CLIENT_ID_NAVER = `_C3PBo2bCvIFtIcgmPeK`;
  // const STATE_NAVER = '1234';
  const REDIRECT_URI = `http://localhost:8002/oauth/kakao`;
  // const REDIRECT_URI_NAVER = `http://localhost:8002/oauth/naver`;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  // const naverURL = `https://nid.naver.com/oauth2.0/authorize?&response_type=code&client_id=${CLIENT_ID_NAVER}&redirect_uri=${REDIRECT_URI_NAVER}&state=${STATE_NAVER}`;

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
        onClick={() => (window.location.href = kakaoURL)}
        // onClick={() => (window.location.href = naverURL)}
      />
    </div>
  );
};

export default KakaoLogin;
