import React, { useEffect, useRef, useState } from "react";
import { BsChat, BsSend } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import Comment from "./Comment";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import "../styles.css";
import DropdownMenu from "./DropdownMenu";
import { PostFormTextArea } from "./PostForm";
import axios from "axios";

const Post = ({ id, title, content, category, fetchData }) => {
  const [comments, setComments] = useState([
    { id: "admin1", content: "첫 번째 댓글" },
    { id: "admin2", content: "둘 번째 댓글" },
    { id: "admin3", content: "세 번째 댓글" },
    { id: "admin4", content: "네 번째 댓글" },
    { id: "admin5", content: "다섯 번째 댓글" },
    // Add more comments here
  ]);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [showMenu, setShowMenu] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments((prevComments) => [{ id: 1, content: newComment }, ...prevComments]);
      setNewComment("");
      inputRef.current.blur();
    } else {
      alert("댓글을 입력해주세요");
    }
  };

  const handleDeleteComment = (index) => {
    const shouldDelete = window.confirm("정말로 이 댓글을 삭제하시겠습니까?");
    if (shouldDelete) {
      const updatedComments = comments.filter((_, i) => i !== index);
      setComments(updatedComments);
    }
  };

  const handleEditComment = (index, content) => {
    const updatedComments = [...comments];
    updatedComments[index] = content;
    setComments(updatedComments);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddComment();
    }
  };

  const [inputFocused, setInputFocused] = useState(false);
  const handleInputFocus = () => {
    setInputFocused(true);
  };
  const handleInputBlur = () => {
    setInputFocused(false);
  };

  const inputRef = useRef(null);

  const handleEdit = () => {
    if (!editing) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedContent(content);
    setEditing(false);
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleEditPost = async () => {
    if (editedContent.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/board?id=${id}&content=${editedContent}`,
        {
          title: title,
          content: editedContent,
          category: category,
        },
        {
          headers: {
            ACCESS_TOKEN: userInfo.access_TOKEN,
          },
        }
      );

      if (response.status === 200) {
        alert("게시글이 성공적으로 수정되었습니다.");
        fetchData();
        setEditing(false);
      } else {
        alert("게시글 수정에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error occurred while editing the post:", error);
      alert("게시글 수정에 실패하였습니다.");
    }
  };

  const handleDelete = async () => {
    const shouldDelete = window.confirm("정말로 이 게시글을 삭제하시겠습니까?");
    if (shouldDelete) {
      try {
        const response = await axios.delete(`http://localhost:8080/board?id=${id}`, {
          headers: {
            ACCESS_TOKEN: userInfo.access_TOKEN,
          },
        });

        if (response.status === 200) {
          alert("게시글이 성공적으로 삭제되었습니다.");
          fetchData();
        } else {
          alert("게시글 삭제에 실패하였습니다.");
        }
      } catch (error) {
        console.error("Error occurred while deleting the post:", error);
        alert("게시글 삭제에 실패하였습니다.");
      }
    }
  };

  return (
    <div
      style={{
        padding: "1rem",
        paddingBottom: "0",
        backgroundColor: "#f2f2f2",
      }}
    >
      <article
        className="Post"
        style={{
          padding: "1rem",
          backgroundColor: "white",
          borderRadius: "5px",
        }}
      >
        {editing ? (
          <>
            <PostFormTextArea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <button onClick={handleEditPost}>저장</button>
            <button onClick={handleCancelEdit}>취소</button>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <div>
              <p style={{ margin: "0 0 1rem" }}>{id}</p>
              <p style={{ margin: "0", fontSize: "1rem" }}>{content}</p>
            </div>
            <div
              onMouseEnter={() => setShowMenu(true)}
              onMouseLeave={() => setShowMenu(false)}
              style={{ position: "absolute", right: 0, top: 0 }}
            >
              <button onClick={() => setShowMenu((prev) => !prev)}>
                <FiMoreHorizontal />
              </button>
              {showMenu && <DropdownMenu onEdit={handleEdit} onDelete={handleDelete} />}
            </div>
          </div>
        )}

        {!editing && (
          <>
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                position: "relative",
                flex: 1,
              }}
            >
              <BsChat
                style={{
                  marginTop: "1rem",
                  marginRight: "0.5rem",
                  opacity: inputFocused ? "0" : "1",
                  transition: "opacity 0.3s ease-in-out",
                }}
              />
              <input
                style={{
                  padding: "1rem",
                  backgroundColor: "#f2f2f2",
                  border: `1px solid ${inputFocused ? "#1E90FF" : "#f2f2f2"}`,
                  borderRadius: "50px",
                  outline: "none",
                  flex: 1,
                  transition: "width 0.3s ease-in-out, margin 0.3s ease-in-out",
                  width: inputFocused ? "90%" : "100%",
                  marginLeft: inputFocused ? "-2rem" : "0",
                }}
                placeholder="댓글을 입력해주세요"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={handleInputKeyDown}
                ref={inputRef}
              />
              <BsSend
                className="send-button"
                style={{
                  backgroundColor: "white",
                  padding: "0.5rem",
                  borderRadius: "10px",
                  color: "#1E90FF",
                  position: "absolute",
                  right: "1rem",
                  top: "0.5rem",
                  opacity: inputFocused ? "1" : "0",
                  transition: "opacity 0.3s ease-in-out",
                  cursor: "pointer",
                }}
                onClick={handleAddComment}
              />
            </div>
            <div style={{ marginTop: "1rem" }}>
              {comments.slice(0, showAllComments ? comments.length : 2).map((comment, index) => (
                <Comment
                  key={index}
                  comment={comment}
                  onDelete={() => handleDeleteComment(index)}
                  onEdit={(content) => handleEditComment(index, content)}
                />
              ))}
            </div>
            <div>
              {comments.length > 2 && (
                <button
                  className="Post__button"
                  onClick={() => setShowAllComments(!showAllComments)}
                >
                  {showAllComments ? (
                    <>
                      <MdOutlineExpandLess />
                      닫기
                    </>
                  ) : (
                    <>
                      <MdOutlineExpandMore />더 보기
                    </>
                  )}
                </button>
              )}
            </div>
          </>
        )}
      </article>
    </div>
  );
};

export default Post;
