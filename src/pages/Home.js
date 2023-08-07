// Home.js

import React, { useEffect, useState } from "react";
import "../styles.css";
import Menu from "../components/Menu";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Added current page state
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, []);
  const fetchPosts = async (page) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://io065rlls1.execute-api.ap-northeast-2.amazonaws.com/board/pageList?page=${page}&size=5`,
        {
          headers: {
            ACCESS_TOKEN: userInfo.access_TOKEN,
          },
        }
      );
      if (response.status === 200) {
        const newPosts = response.data.data.content;

        if (newPosts.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prevPosts) => {
            const postIds = prevPosts.map((post) => post.id);
            const filteredPosts = newPosts.filter((post) => !postIds.includes(post.id));
            return [...prevPosts, ...filteredPosts];
          });
          setCurrentPage(page);
        }
      } else {
        alert("게시글 불러오기 실패");
      }
    } catch (error) {
      console.error("게시글 가져오기 에러:", error);
      alert("게시글 불러오기 실패");
    } finally {
      setIsLoading(false);
    }
  };

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
        fetchPosts={fetchPosts}
      />
    </div>
  );
}

export default Home;
