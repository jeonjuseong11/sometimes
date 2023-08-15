import React from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: absolute;
  right: 1.4rem;
  top: 1.5rem;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 3rem;
  zindex: 2;
`;
const DropdownMenu = ({ onEdit, onDelete }) => {
  return (
    <DropdownContainer>
      <button onClick={onEdit} style={{ width: "100%" }}>
        수정
      </button>
      <button onClick={onDelete} style={{ width: "100%" }}>
        삭제
      </button>
    </DropdownContainer>
  );
};

export default DropdownMenu;
