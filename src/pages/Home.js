import React from "react";
import "../styles.css";
import Menu from "../components/Menu";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
function Home() {
  return (
    <div>
      <Menu />
      <PostForm />
      <PostList />
    </div>
  );
}

export default Home;
