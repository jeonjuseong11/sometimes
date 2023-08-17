import React, { useEffect, useRef } from "react";
import Post from "./Post";
import axios from "axios";

const PostList = ({ posts, setPosts, isLoading, hasMore, currentPage, fetchPosts }) => {
  const observer = useRef();
  const lastPostRef = useRef();

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
    // console.log(posts);
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
