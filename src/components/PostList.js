import React, { useEffect, useRef, useState } from "react";
import Post from "./Post";

const PostList = ({ posts, setPosts, isLoading, hasMore, currentPage, fetchPosts }) => {
  const observer = useRef();
  const lastPostRef = useRef();
  const [loadingTimeout, setLoadingTimeout] = useState(null);

  useEffect(() => {
    fetchPosts(0);
  }, []);

  useEffect(() => {
    if (isLoading || !hasMore || loadingTimeout !== null) {
      return;
    }

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setLoadingTimeout(
          setTimeout(() => {
            fetchPosts(currentPage + 1);
            setLoadingTimeout(null);
          }, 10000)
        );
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
      if (loadingTimeout !== null) {
        clearTimeout(loadingTimeout);
        setLoadingTimeout(null);
      }
    };
  }, [isLoading, hasMore, currentPage, loadingTimeout]);

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
      {isLoading && <div style={{ padding: "1rem", textAlign: "center" }}>Loading...</div>}
      {!hasMore && <div style={{ padding: "1rem", textAlign: "center" }}>글의 끝입니다.</div>}
    </div>
  );
};

export default PostList;
