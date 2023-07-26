import React from "react";
import Post from "./Post";
import styled from "styled-components";

export const PostContainer = styled.div`
  background-color: #f2f2f2;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 12rem;
`;

const PostList = ({ posts, isLoading, isError, fetchData }) => {
  if (isLoading) {
    return (
      <PostContainer>
        <h3>Loading...</h3>
      </PostContainer>
    );
  }

  if (isError) {
    return (
      <PostContainer>
        <h2>글 로드에 실패하였습니다.</h2>
      </PostContainer>
    );
  }

  // posts 배열을 id의 역순으로 정렬
  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

  // isDeleted가 false인 항목만 필터링
  const filteredPosts = sortedPosts.filter((post) => !post.isDeleted);

  if (filteredPosts.length === 0) {
    return (
      <PostContainer>
        <h2>글이 없습니다.</h2>
      </PostContainer>
    );
  }

  return (
    <div>
      {filteredPosts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          fetchData={fetchData}
        />
      ))}
    </div>
  );
};

export default PostList;
