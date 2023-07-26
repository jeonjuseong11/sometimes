import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

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

const PostForm = () => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    const newEntry = {
      id: 1,
      title: "제목",
      content: content,
      category: "카테고리",
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/board",
        newEntry
      );
      if (response.status === 200) {
        alert("게시물이 성공적으로 작성되었습니다.");
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
        paddingTop: "1rem",
        padding: "1rem",
        paddingBottom: "0",
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
