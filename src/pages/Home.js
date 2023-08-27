import React, { useEffect, useRef, useState } from "react";
import Menu from "../components/Menu";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { useNavigate } from "react-router-dom";
import { usePostContext } from "../contexts/PostContext";
import { decryptData } from "../utils/decryptData";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const encryptedUserInfo = localStorage.getItem("userInfo");
    const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;
    const decryptedUserInfo = decryptData(encryptedUserInfo, encryptionKey);
    const userInfo = JSON.parse(decryptedUserInfo);

    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  const { hasMore, currentPage, fetchPosts, setCurrentPage } = usePostContext();
  const [loadingMore, setLoadingMore] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (currentPage === 0) {
      fetchPosts(0); // 초기 페이지 요청
      setCurrentPage(1);
    }
  }, [currentPage, fetchPosts, setCurrentPage]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container && container.scrollHeight - container.scrollTop <= container.clientHeight + 1) {
      loadMorePosts();
    }
  };

  const loadMorePosts = async () => {
    console.log(currentPage);
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      await fetchPosts(currentPage + 1); // 다음 페이지 게시물 불러오기
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [loadingMore]);
  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: "#f2f2f2", height: "100vh", overflowY: "auto" }}
    >
      <Menu />
      <PostForm />
      <PostList />
    </div>
  );
}

export default Home;
