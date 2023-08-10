import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiMoreHorizontal } from "react-icons/fi";
import DropdownMenu from "./DropdownMenu";
import styled from "styled-components";

const CommentContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const StyledTextarea = styled.textarea`
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 1rem;
  display: inline-block;
  width: 100%;
  margin-right: 0.5rem;
  box-sizing: border-box;
  resize: none;
  border: 0;
  outline: none;
`;

const StyledButton = styled.button`
  background-color: transparent;
  display: inline-block;
`;

const CommentContent = styled.div`
  display: flex;
  position: relative;
`;

const CommentContentWrapper = styled.div`
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 1rem;
  display: inline-block;
`;

const CommentActions = styled.div`
  position: relative;
  right: 0;
  top: 0;
  display: inline-block;
`;

const Comment = ({ comment, fetchComments, boardId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    setEditedContent(comment.content);
  }, [comment]);

  const apiUrl = "https://io065rlls1.execute-api.ap-northeast-2.amazonaws.com/comment";

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

  const isEdited = editedContent.trim() !== comment.content.trim();
  const isReplyNotEmpty = replyContent.trim() !== "";

  return (
    <CommentContainer>
      {isEditing ? (
        <div>
          <StyledTextarea value={editedContent} onChange={handleContentChange} />
          <StyledButton type="button" onClick={handleSaveEdit} disabled={!isEdited}>
            저장
          </StyledButton>
          <StyledButton type="button" onClick={handleCancelEdit}>
            취소
          </StyledButton>
        </div>
      ) : (
        <CommentContent>
          <CommentContentWrapper>
            <p style={{ margin: "0" }}>{comment.userId}</p>
            <div>{displayContentWithLineBreaks(comment.content)}</div>
          </CommentContentWrapper>
          <CommentActions onMouseEnter={handleToggleMenu} onMouseLeave={handleToggleMenu}>
            <StyledButton type="button" onClick={handleToggleMenu}>
              <FiMoreHorizontal />
            </StyledButton>
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
          </CommentActions>
        </CommentContent>
      )}

      {showReplyInput && (
        <div>
          <StyledTextarea value={replyContent} onChange={handleReplyContentChange} />
          <StyledButton type="button" onClick={handleSaveReply} disabled={!isReplyNotEmpty}>
            저장
          </StyledButton>
          <StyledButton type="button" onClick={handleCancelReply}>
            취소
          </StyledButton>
        </div>
      )}

      {!isEditing && !showReplyInput && (
        <StyledButton type="button" onClick={handleReplyClick}>
          답글
        </StyledButton>
      )}

      {comment.children?.length > 0 && (
        <div>
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
    </CommentContainer>
  );
};

export default Comment;
