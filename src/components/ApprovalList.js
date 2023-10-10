import React from "react";
import styled from "styled-components";
import ApprovalPost from "./ApprovalPost";

// 스타일드 컴포넌트를 사용하여 스타일을 적용한 컨테이너를 생성합니다.
export const PostContainer = styled.div`
  background-color: #f2f2f2;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 18rem;
`;

const ApprovalList = ({ posts, isLoading, isError, fetchData }) => {
  // 만약 데이터 로딩 중이면 로딩 메시지를 표시합니다.
  if (isLoading) {
    return (
      <PostContainer>
        <h3>Loading...</h3>
      </PostContainer>
    );
  }

  // 만약 데이터 로딩 중 에러가 발생하면 에러 메시지를 표시합니다.
  if (isError) {
    return (
      <PostContainer>
        <h2>글 로드에 실패하였습니다.</h2>
      </PostContainer>
    );
  }

  // 포스트들을 id 기준으로 역순으로 정렬합니다.

  const sortedPosts = posts?.sort((a, b) => b.id - a.id);
  // isDeleted가 false인 항목만 필터링하여 새로운 배열을 만듭니다.
  const filteredPosts = sortedPosts?.filter((post) => !post.isDeleted);

  // 만약 필터링된 포스트가 없다면 글이 없다는 메시지를 표시합니다.
  if (filteredPosts?.length === 0) {
    return (
      <PostContainer style={{ height: "85vh" }}>
        <h2>글이 없습니다.</h2>
      </PostContainer>
    );
  }

  // 포스트 목록을 렌더링합니다.
  return (
    <div style={{ height: "89vh" }}>
      {filteredPosts?.map((post) => (
        <ApprovalPost
          key={post.id}
          id={post.id}
          userName={post.userName}
          title={post.title}
          content={post.content}
          fetchData={fetchData}
        />
      ))}
    </div>
  );
};

export default ApprovalList;
