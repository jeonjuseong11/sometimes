import React, { useEffect, useState, useRef } from "react";
import { usePostContext } from "../contexts/PostContext";
import Post from "./Post";

const PostList = () => {
  const { posts, isLoading, hasMore } = usePostContext();

  return (
    <div style={{ height: "100%" }}>
      {posts.map((post, index) => (
        <div key={post.id}>
          <Post {...post} />
        </div>
      ))}
      {isLoading && <div style={{ padding: "1rem", textAlign: "center" }}>Loading...</div>}
      {!isLoading && hasMore && (
        <div style={{ padding: "1rem", textAlign: "center" }}>
          <p>스크롤해서 더 불러오기</p>
        </div>
      )}
      {!hasMore && <div style={{ padding: "1rem", textAlign: "center" }}>글의 끝입니다.</div>}
    </div>
  );
};

export default PostList;
