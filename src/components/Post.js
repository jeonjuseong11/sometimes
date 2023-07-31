import React, { useEffect, useRef, useState } from "react";
import { BsChat, BsChatDots, BsSend } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import Comment from "./Comment";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import "../styles.css";
import DropdownMenu from "./DropdownMenu";
import { PostFormTextArea } from "./PostForm";
import axios from "axios";

const Post = ({ id, title, content, category, fetchData }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [showMenu, setShowMenu] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [addingComment, setAddingComment] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const inputRef = useRef(null);

  const handleComment = () => {
    setShowComment(!showComment);
    if (showComment === false) {
      fetchComments();
    }
  };
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/comment/list?boardId=${id}`);
      if (response.status === 200) {
        setComments(response.data.data);
        setCommentsLoaded(true);
      } else {
        alert("댓글 불러오기 실패");
      }
    } catch (error) {
      console.error("댓글 가져오기 에러:", error);
      alert("댓글 불러오기 실패");
    }
  };

  const handleAddComment = async () => {
    if (addingComment) return;

    if (newComment.trim() !== "") {
      try {
        setAddingComment(true);
        setShowComment(true); // 댓글을 추가하고 댓글 창을 보여줌

        const response = await axios.post(
          `http://localhost:8080/comment?boardId=${id}&content=${newComment}`,
          {
            boardId: id,
            content: newComment,
          }
        );

        if (response.data.success) {
          const newCommentData = response.data.data;
          setComments((prevComments) => [newCommentData, ...prevComments]);
          setNewComment("");
          setInputFocused(false);

          inputRef.current.blur();
        } else {
          alert("댓글 추가 실패");
        }
      } catch (error) {
        console.error("댓글 추가 에러:", error);
        alert("댓글 추가 실패");
      } finally {
        setAddingComment(false);
      }
    } else {
      alert("댓글을 입력해주세요");
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddComment();
    }
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  const handleEdit = () => {
    setShowMenu(false);
    setEditing((prevEditing) => !prevEditing);
  };

  const handleCancelEdit = () => {
    setShowMenu(false);
    setEditing(false);
  };

  const handleEditPost = async () => {
    setShowMenu(false);
    if (editedContent.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/board/update?id=${id}&content=${editedContent}`,
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
        const response = await axios.put(`http://localhost:8080/board/delete?id=${id}`, {
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
    <div style={{ padding: "1rem", paddingBottom: "0", backgroundColor: "#f2f2f2" }}>
      <article
        className="Post"
        style={{
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
              padding: "1rem",
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
              style={{ position: "absolute", right: 5, top: 5 }}
            >
              <button onClick={() => setShowMenu((prev) => !prev)}>
                <FiMoreHorizontal />
              </button>
              {showMenu && <DropdownMenu onEdit={handleEdit} onDelete={handleDelete} />}
            </div>
          </div>
        )}
        <div
          style={{
            borderTop: "1px solid #f2f2f2",
            borderBottom: "1px solid #f2f2f2",
            marginTop: "1rem",
          }}
        >
          <button onClick={handleComment} style={{ padding: "1rem" }}>
            <BsChatDots style={{ marginRight: ".5rem" }} />
            댓글 달기
          </button>
        </div>
        {!editing && (
          <>
            <div
              style={{
                display: "flex",
                position: "relative",
                padding: "1rem",
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

            {showComment && commentsLoaded ? (
              comments.length !== 0 ? (
                <div style={{ padding: "1rem" }}>
                  {comments
                    .slice(0, showAllComments ? comments.length : 2)
                    .map((comment, index) => (
                      <Comment key={index} comment={comment} fetchComments={fetchComments} />
                    ))}

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
              ) : (
                <p>댓글이 없습니다</p>
              )
            ) : (
              <></>
            )}
          </>
        )}
      </article>
    </div>
  );
};

export default Post;
