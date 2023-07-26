import React from "react";

const DropdownMenu = ({ onEdit, onDelete }) => {
  return (
    <div
      className="dropdown-menu"
      style={{
        position: "absolute",
        top: "100%",
        right: 0,
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "5px",
        width: "3rem",
        zIndex: 2, // Ensure the menu is above the content
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
