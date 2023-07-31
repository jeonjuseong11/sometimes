import React from "react";

const DropdownMenu = ({ onEdit, onDelete }) => {
  return (
    <div
      className="dropdown-menu"
      style={{
        position: "absolute",
        right: "1.4rem",
        top: "1.5rem",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "5px",
        width: "3rem",
        zIndex: 2,
      }}
    >
      <button onClick={onEdit} style={{ width: "100%" }}>
        수정
      </button>
      <button onClick={onDelete} style={{ width: "100%" }}>
        삭제
      </button>
    </div>
  );
};

export default DropdownMenu;
