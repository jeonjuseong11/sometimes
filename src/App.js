import React, { useEffect } from "react";
import "./styles.css";
import Home from "./pages/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Menu from "./components/Menu";
import Notification from "./pages/Notification";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios";
import Approval from "./pages/Approval";
import { decryptData } from "./utils/decryptData";
import KakaoCallback from "./components/KakaoCallback";

function App() {
  const encryptedUserInfo = localStorage.getItem("userInfo"); // 암호화된 유저 정보
  const navigate = useNavigate();
  useEffect(() => {
    if (!encryptedUserInfo) {
      navigate("/");
    } else {
      const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

      // 복호화된 유저 정보를 가져옴
      const decryptedUserInfo = decryptData(encryptedUserInfo, encryptionKey);
      const userInfo = JSON.parse(decryptedUserInfo);
      axios.defaults.headers.common["ACCESS_TOKEN"] = userInfo?.access_TOKEN;
    }
  }, [encryptedUserInfo, navigate]);
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Login />} />
        {/* <Route exact path="/oauth/kakao" element={<Login />} /> */}
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/oauth/kakao" element={<KakaoCallback />} />
        <Route element={<Menu />}>
          <Route exact path="/notification" element={<Notification />} />
          <Route exact path="/approval" element={<Approval />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
