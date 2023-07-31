import React from "react";
import axios from "axios";
import { BsCheckLg } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
  padding-bottom: 0;
  background-color: #f2f2f2;
`;

const Article = styled.article`
  padding: 1rem;
  background-color: white;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const ApprovalButton = styled.button`
  width: 2rem;
  height: 2rem;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.hoverColor};
    color: white;
  }
`;

const ApproveButton = styled(ApprovalButton)`
  background: #275efe;
`;

const RejectButton = styled(ApprovalButton)`
  color: red;
`;

const ApprovalPost = ({ id, title, content, category, fetchData }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <Container>
      <Article>
        <div>
          <p style={{ margin: "0 0 1rem" }}>{id}</p>
          <p style={{ margin: "0", fontSize: "1rem" }}>{content}</p>
        </div>

        <ButtonContainer>
          <div>{/* Your other buttons can be placed here if needed */}</div>
          <div style={{ display: "flex" }}>
            <ApproveButton hoverColor="#1a47c9">
              <BsCheckLg />
            </ApproveButton>
            <RejectButton hoverColor="#ff1a1a">
              <ImCancelCircle />
            </RejectButton>
          </div>
        </ButtonContainer>
      </Article>
    </Container>
  );
};

export default ApprovalPost;
