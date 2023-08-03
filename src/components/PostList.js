import React, { useEffect, useRef, useState } from "react";
import Post from "./Post";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const observer = useRef();
  const lastPostRef = useRef();

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8080/board/pageList?page=${currentPage}&size=5`,
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
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
          setCurrentPage((prevPage) => prevPage + 1);
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

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        fetchPosts();
      }
    };

    observer.current = new IntersectionObserver(handleObserver, options);
    if (lastPostRef.current) {
      observer.current.observe(lastPostRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isLoading, hasMore]);

  return (
    <div>
      {posts.map((post, index) => {
        if (index === posts.length - 1) {
          return (
            <div key={index} ref={lastPostRef}>
              <Post {...post} style={{ paddingBottom: "1rem" }} />
            </div>
          );
        } else {
          return (
            <div key={index}>
              <Post {...post} />
            </div>
          );
        }
      })}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default PostList;
