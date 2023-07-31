import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiMoreHorizontal } from "react-icons/fi";
import DropdownMenu from "./DropdownMenu";

const Comment = ({ comment, fetchComments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setEditedContent(comment.content);
  }, [comment]);

  const apiUrl = "http://localhost:8080/comment";

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(comment.content);
  };

  const handleSaveEdit = () => {
    const shouldEdit = window.confirm("댓글을 수정하시겠습니까?");
    if (shouldEdit) {
      if (editedContent.trim() !== "") {
        const updatedComment = {
          id: comment.id,
          content: editedContent,
        };

        const params = new URLSearchParams(updatedComment).toString();
        axios
          .put(`${apiUrl}?${params}`)
          .then((response) => {
            if (response.status === 200) {
              setIsEditing(false);
              fetchComments();
            } else {
              console.log("댓글 수정 실패");
            }
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
      }
    }
  };

  const handleDelete = () => {
    const shouldDelete = window.confirm("정말로 댓글을 삭제하시겠습니까?");
    if (shouldDelete) {
      const params = new URLSearchParams({ id: comment.id }).toString();
      axios
        .delete(`${apiUrl}?${params}`)
        .then((response) => {
          if (response.status === 200) {
            fetchComments();
          } else {
            console.log("댓글 삭제 실패");
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    }
  };

  const handleContentChange = (e) => {
    const editedContent = e.target.value;
    setEditedContent(editedContent);
  };

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div style={{ position: "relative", marginBottom: "1rem" }}>
      {isEditing ? (
        <div>
          <input
            style={{
              width: "100%",
              padding: "0.5rem",
              marginRight: "0.5rem",
            }}
            value={editedContent}
            onChange={handleContentChange}
          />
          <button type="button" onClick={handleSaveEdit}>
            저장
          </button>
          <button type="button" onClick={handleCancelEdit}>
            취소
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", position: "relative" }}>
          <div
            style={{
              backgroundColor: "#f2f2f2",
              borderRadius: "10px",
              padding: "1rem",
              display: "inline-block",
            }}
          >
            <p style={{ margin: "0" }}>{comment.userId}</p>
            <p style={{ margin: "0" }}>{comment.content}</p>
          </div>
          <div
            style={{ position: "absolute", right: 0, top: 0 }}
            onMouseEnter={handleToggleMenu}
            onMouseLeave={handleToggleMenu}
          >
            <button
              type="button"
              onClick={handleToggleMenu}
              style={{ backgroundColor: "transparent" }}
            >
              <FiMoreHorizontal />
            </button>
            {showMenu && (
              <DropdownMenu
                onEdit={() => {
                  handleToggleMenu();
                  handleEditClick();
                }}
                onDelete={() => {
                  handleToggleMenu();
                  handleDelete();
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
