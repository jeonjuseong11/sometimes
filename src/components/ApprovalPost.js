import React, { useState } from "react";
import axios from "axios";
import { BsCheckLg } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import styled from "styled-components";
import { decryptData } from "../utils/decryptData"; // decryptData import 추가

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

const ApprovalPost = ({ userName, id, content, fetchData }) => {
  const userInfo = JSON.parse(decryptData(localStorage.getItem("userInfo"))); // decryptData 적용
  const [state, setState] = useState();
  const acceptPost = async (state) => {
    try {
      const response = await axios.put(
        `https://io065rlls1.execute-api.ap-northeast-2.amazonaws.com/board/changeState/${id}?state=${state}`,
        null,
        {
          headers: {
            ACCESS_TOKEN: userInfo.access_TOKEN,
          },
        }
      );

      if (response.status === 200) {
        alert("게시글 확인 완료");
        fetchData();
      } else {
        alert("게시글 확인 실패");
      }
    } catch (error) {
      console.error("Error occurred while editing the post:", error);
      alert("게시글 확인 실패");
    }
  };

  return (
    <Container>
      <Article>
        <div>
          <p style={{ margin: "0 0 1rem" }}>{userName}</p>
          <p style={{ margin: "0", fontSize: "1rem" }}>{content}</p>
        </div>

        <ButtonContainer>
          <div style={{ display: "flex" }}>
            <ApproveButton onClick={() => acceptPost(1)} hoverColor="#1a47c9">
              <BsCheckLg />
            </ApproveButton>
            <RejectButton onClick={() => acceptPost(2)} hoverColor="#ff1a1a">
              <ImCancelCircle />
            </RejectButton>
          </div>
        </ButtonContainer>
      </Article>
    </Container>
  );
};

export default ApprovalPost;
