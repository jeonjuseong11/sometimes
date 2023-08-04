import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiMoreHorizontal } from "react-icons/fi";
import DropdownMenu from "./DropdownMenu";

const Comment = ({ comment, fetchComments, boardId }) => {
  const [isEditing, setIsEditing] = useState(false); //댓글을 수정중인가
  const [editedContent, setEditedContent] = useState(""); //수정중인 댓글
  const [showMenu, setShowMenu] = useState(false); //수정 삭제 메뉴를 보이게 하는가
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState(""); //답글 내용
  const [isReplying, setIsReplying] = useState(false); //답글 입력창을 보이게 하는가

  useEffect(() => {
    setEditedContent(comment.content);
  }, [comment]);

  const apiUrl = "http://localhost:8080/comment"; //댓글 url 설정

  const handleEditClick = () => {
    if (!isReplying) {
      setIsEditing(true);
    }
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
            if (response.data.success) {
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
          if (response.data.success) {
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

  const handleReplyClick = () => {
    if (!isEditing) {
      setShowReplyInput(true);
      setIsReplying(true);
    }
  };

  const handleCancelReply = () => {
    setShowReplyInput(false);
    setReplyContent("");
    setIsReplying(false);
  };

  const handleSaveReply = () => {
    const shouldReply = window.confirm("대댓글을 작성하시겠습니까?");
    if (shouldReply) {
      if (replyContent.trim() !== "") {
        const newReply = {
          boardId: boardId,
          content: replyContent,
          parentId: comment.id,
        };

        axios
          .post(
            `${apiUrl}?boardId=${newReply.boardId}&content=${newReply.content}&parentId=${newReply.parentId}`,
            newReply
          )
          .then((response) => {
            if (response.data.success) {
              setShowReplyInput(false);
              setReplyContent("");
              fetchComments();
            } else {
              console.log("대댓글 작성 실패");
            }
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
      }
    }
  };

  const handleReplyContentChange = (e) => {
    const replyContent = e.target.value;
    setReplyContent(replyContent);
  };

  const displayContentWithLineBreaks = (content) => {
    const lines = content.split("\n");
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  // Check if the comment is edited or if there is content for replying
  const isEdited = editedContent.trim() !== comment.content.trim();
  const isReplyNotEmpty = replyContent.trim() !== "";

  return (
    <div style={{ position: "relative", marginBottom: "1rem" }}>
      {isEditing ? (
        <div>
          <textarea
            style={{
              backgroundColor: "#f2f2f2",
              borderRadius: "10px",
              padding: "1rem",
              display: "inline-block",
              width: "100%",
              marginRight: "0.5rem",
              boxSizing: "border-box",
              resize: "none",
              border: "0",
              outline: "none",
            }}
            value={editedContent}
            onChange={handleContentChange}
          />
          <button type="button" onClick={handleSaveEdit} disabled={!isEdited}>
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
            <div>{displayContentWithLineBreaks(comment.content)}</div>
          </div>
          <div
            style={{ position: "relative", right: 0, top: 0 }}
            onMouseEnter={handleToggleMenu}
            onMouseLeave={handleToggleMenu}
          >
            <button
              type="button"
              onClick={handleToggleMenu}
              style={{ backgroundColor: "transparent", display: "inline-block" }}
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

      {showReplyInput && (
        <div style={{ marginTop: "1rem", marginLeft: "2rem" }}>
          <textarea
            style={{
              backgroundColor: "#f2f2f2",
              borderRadius: "10px",
              padding: "1rem",
              width: "100%",
              boxSizing: "border-box",
              resize: "none",
              border: "none",
              outline: "none",
            }}
            value={replyContent}
            onChange={handleReplyContentChange}
          />
          <button type="button" onClick={handleSaveReply} disabled={!isReplyNotEmpty}>
            저장
          </button>
          <button type="button" onClick={handleCancelReply}>
            취소
          </button>
        </div>
      )}

      {!isEditing && !showReplyInput && (
        <button type="button" onClick={handleReplyClick}>
          답글
        </button>
      )}

      {comment.children?.length > 0 && (
        <div style={{ marginLeft: "2rem" }}>
          {comment.children.map((childComment) => (
            <Comment
              key={childComment.id}
              boardId={boardId}
              comment={childComment}
              fetchComments={fetchComments}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
