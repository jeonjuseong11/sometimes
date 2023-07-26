import React, { useState } from "react";
import axios from "axios";
import { FiMoreHorizontal } from "react-icons/fi";
import DropdownMenu from "./DropdownMenu";

const Comment = ({ comment, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [showMenu, setShowMenu] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(comment.content);
  };

  const handleSaveEdit = () => {
    if (editedContent.trim() !== "") {
      const updatedComment = {
        id: comment.id,
        content: editedContent,
      };

      axios
        .put("http://localhost:8080/comment", updatedComment)
        .then((response) => {
          if (response.status === 200) {
            onEdit(updatedComment);
          } else {
            console.log("댓글 수정 실패");
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
        });

      setIsEditing(false);
    }
  };

  return (
    <div style={{ marginBottom: "0.5rem", position: "relative" }}>
      {isEditing ? (
        <div>
          <input
            style={{
              width: "100%",
              padding: "0.5rem",
              marginRight: "0.5rem",
            }}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
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
            <p style={{ margin: "0" }}>{comment.id}</p>
            <p style={{ margin: "0" }}>{comment.content}</p>
          </div>
          <div
            style={{ position: "absolute", right: 0, top: 0 }}
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <button onClick={() => setShowMenu((prev) => !prev)}>
              <FiMoreHorizontal />
            </button>
            {showMenu && (
              <DropdownMenu
                onEdit={() => {
                  setShowMenu(false);
                  handleEditClick();
                }}
                onDelete={() => {
                  setShowMenu(false);
                  onDelete();
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
