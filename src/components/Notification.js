import React from "react";
import "../styles.css";
import PostList from "./PostList";
import PostForm from "./PostForm";

const Notification = () => {
  return (
    <div
      className="Notification"
      style={{ margin: "0", backgroundColor: "#f2f2f2" }}
    >
      <PostForm />
      <PostList />
    </div>
  );
};

export default Notification;
