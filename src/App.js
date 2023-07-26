import React from "react";
import "./styles.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Notification from "./components/Notification";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route element={<Menu />}>
          <Route exact path="/notification" element={<Notification />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
