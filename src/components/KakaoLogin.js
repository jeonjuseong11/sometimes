const KakaoLogin = () => {
  const CLIENT_ID = `af3012c5962e39aa160c3e21392445c3`;
  const REDIRECT_URI = `http://localhost:8002/oauth/kakao`;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

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
      />
    </div>
  );
};

export default KakaoLogin;
