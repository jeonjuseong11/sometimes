import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { decryptData } from "../utils/decrypyData";

const StyledPostForm = styled.form`
  padding: 1rem;
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const PostFormTextArea = styled.textarea`
  width: 100%;
  resize: none;
  background-color: #f2f2f2;
  padding: 1rem;
  outline: none;
  box-sizing: border-box;
  border-radius: 10px;
  border: 0;
  flex: 1;
`;

const SubmitButton = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  border: 0;
  font-weight: 650;
  width: 100%;
  align-self: flex-end;
  background-color: #007bff;
  color: white;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const PostForm = ({ posts, setPosts, setIsLoading, setHasMore, setCurrentPage }) => {
  const [content, setContent] = useState("");
  const encryptedUserInfo = localStorage.getItem("userInfo");
  const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

  // 복호화된 유저 정보를 가져옴
  const decryptedUserInfo = decryptData(encryptedUserInfo, encryptionKey);
  const userInfo = JSON.parse(decryptedUserInfo);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://io065rlls1.execute-api.ap-northeast-2.amazonaws.com/board/pageList?page=0&size=5`,
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
          // Check for duplicates and add only new posts
          setPosts((prevPosts) => {
            const postIds = prevPosts.map((post) => post.id);
            const filteredPosts = newPosts.filter((post) => !postIds.includes(post.id));
            return [...filteredPosts, ...prevPosts];
          });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    const newEntry = {
      id: 1,
      content: content,
    };

    try {
      const response = await axios.post(
        `https://io065rlls1.execute-api.ap-northeast-2.amazonaws.com/board/create?content=${newEntry.content}`,
        newEntry,
        {
          headers: {
            ACCESS_TOKEN: userInfo.access_TOKEN,
          },
        }
      );
      if (response.data.success) {
        alert("게시물이 성공적으로 작성되었습니다.");
        fetchPosts();
      } else {
        alert("게시물 작성에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error occurred while posting the data:", error);
      alert("게시물 작성에 실패하였습니다.");
    }
    setContent("");
  };

  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        padding: "1rem",
      }}
    >
      <StyledPostForm onSubmit={handleSubmit}>
        <PostFormTextArea
          placeholder="무슨 생각을 하고 계신가요?"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <SubmitButton type="submit" disabled={!content.trim()}>
          게시
        </SubmitButton>
      </StyledPostForm>
    </div>
  );
};

export default PostForm;
