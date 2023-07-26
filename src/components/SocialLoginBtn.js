import React, { useEffect } from "react";
import KakaoLogo from "../assets/icons/kakao_icon.png";
import MetaLogo from "../assets/icons/meta_icon.png";
import NaverLogo from "../assets/icons/naver_icon.png";
import GoogleLogo from "../assets/icons/google_icon.png";
import "./SocialLoginBtn.css";

const SocialBtns = () => {
  let isClicked = false;

  const socialLogin = [
    {
      src: KakaoLogo,
      name: "카카오",
      onClick: (e) => {
        e.preventDefault();

        console.log("kakao");
      },
    },
    {
      src: NaverLogo,
      name: "네이버",
      onClick: (e) => {
        e.preventDefault();

        console.log("naver");
      },
    },
    {
      src: MetaLogo,
      name: "페이스북",
      onClick: (e) => {
        e.preventDefault();

        console.log("meta");
      },
    },
    {
      src: GoogleLogo,
      name: "구글",
      onClick: (e) => {
        console.log("google");
      },
    },
  ];

  const clickBtn = async (type) => {
    if (isClicked) {
      return;
    } else {
      isClicked = true;
      //   util.delay(1000).then(() => {
      //     isClicked = false;
      //   });
    }

    console.log("click");
  };

  return (
    <>
      <div className="div_social">
        {socialLogin.map((e, i) => {
          return (
            <img key={`${e.name}`} onClick={e.onClick} src={e.src} alt="" />
          );
        })}
      </div>
      <div id="naverIdLogin" style={{ display: "none" }} />
      <div id="googleLogin" style={{ display: "none" }} />
    </>
  );
};

export default SocialBtns;
