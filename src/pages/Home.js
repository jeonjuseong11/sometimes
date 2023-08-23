// Home.js
import React, { useEffect, useState } from "react";
import "../styles.css";
import Menu from "../components/Menu";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { decryptData } from "../utils/decryptData";

function Home() {
  const navigate = useNavigate();
  const encryptedUserInfo = localStorage.getItem("userInfo");
  const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;
  const decryptedUserInfo = decryptData(encryptedUserInfo, encryptionKey);
  const userInfo = JSON.parse(decryptedUserInfo);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
      return;
    }
    fetchPosts(0);
  }, [navigate, userInfo]);

  const fetchPosts = async (page) => {
    try {
      if (!hasMore) {
        return; // 더 이상 불러올 게시물이 없으면 요청 중단
      }

      setIsLoading(true);
      const response = await axios.get(`http://localhost:8002/board/pageList?page=${page}&size=5`, {
        headers: {
          ACCESS_TOKEN: userInfo.access_TOKEN,
        },
      });
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

        if (response.data.data.last) {
          setHasMore(false);
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
    <div style={{ backgroundColor: "#f2f2f2", height: "100vh" }}>
      <Menu />
      <PostForm
        posts={posts}
        setPosts={setPosts}
        setIsLoading={setIsLoading}
        setHasMore={setHasMore}
        setCurrentPage={setCurrentPage}
        fetchPosts={fetchPosts}
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
