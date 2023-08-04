// Home.js

import React, { useEffect, useState } from "react";
import "../styles.css";
import Menu from "../components/Menu";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Menu />
      <PostForm
        posts={posts}
        setPosts={setPosts}
        setIsLoading={setIsLoading}
        setHasMore={setHasMore}
        setCurrentPage={setCurrentPage}
      />
      <PostList
        posts={posts}
        setPosts={setPosts}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        hasMore={hasMore}
        setHasMore={setHasMore}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Home;
