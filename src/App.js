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
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (userInfo) {
      axios.defaults.headers.common["ACCESS_TOKEN"] = userInfo?.access_TOKEN;
    }
  }, [userInfo]);
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
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
