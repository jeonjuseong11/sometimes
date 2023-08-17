import React, { useEffect } from "react";
import "./styles.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Notification from "./pages/Notification";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios";
import Approval from "./pages/Approval";

function App() {
  const encryptedUserInfo = localStorage.getItem("userInfo"); // 암호화된 유저 정보

  useEffect(() => {
    if (encryptedUserInfo) {
      const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

      // 데이터 복호화 함수
      const decryptData = (encryptedData, key) => {
        const decryptedData = decodeURIComponent(escape(atob(encryptedData))).replace(key, "");
        return decryptedData;
      };

      // 복호화된 유저 정보를 가져옴
      const decryptedUserInfo = decryptData(encryptedUserInfo, encryptionKey);
      const userInfo = JSON.parse(decryptedUserInfo);
      axios.defaults.headers.common["ACCESS_TOKEN"] = userInfo?.access_TOKEN;
    }
  }, [encryptedUserInfo]);

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route element={<Menu />}>
          <Route exact path="/notification" element={<Notification />} />
          <Route exact path="/approval" element={<Approval />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
