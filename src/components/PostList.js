import React, { useEffect, useRef } from "react";
import Post from "./Post";
import axios from "axios";

const PostList = ({
  posts,
  setPosts,
  setIsLoading,
  isLoading,
  hasMore,
  setHasMore,
  currentPage,
  setCurrentPage,
}) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const observer = useRef();
  const lastPostRef = useRef();

  const fetchPosts = async (page) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:8080/board/pageList?page=${page}&size=5`, {
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
    fetchPosts(0);
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
        fetchPosts(currentPage + 1);
      }
    };

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(handleObserver, options);
    if (lastPostRef.current) {
      observer.current.observe(lastPostRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isLoading, hasMore, currentPage]);
  useEffect(() => {
    console.log(posts);
  }, [posts]);
  return (
    <div>
      {posts.map((post, index) => {
        if (index === posts.length - 1) {
          return (
            <div key={post.id} ref={lastPostRef}>
              <Post
                {...post}
                style={{ paddingBottom: "1rem" }}
                fetchPosts={fetchPosts}
                setPosts={setPosts}
              />
            </div>
          );
        } else {
          return (
            <div key={post.id}>
              <Post {...post} fetchPosts={fetchPosts} setPosts={setPosts} />
            </div>
          );
        }
      })}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default PostList;
