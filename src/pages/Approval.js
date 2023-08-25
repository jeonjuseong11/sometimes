import React, { useEffect, useState } from "react";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApprovalList from "../components/ApprovalList";
import { decryptData } from "../utils/decryptData";

const Approval = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const encryptedUserInfo = localStorage.getItem("userInfo");
    const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;
    const decryptedUserInfo = decryptData(encryptedUserInfo, encryptionKey);
    const userInfo = JSON.parse(decryptedUserInfo);

    if (!userInfo) {
      navigate("/");
    } else {
      fetchData(userInfo.access_TOKEN);
    }
  }, []);

  const fetchData = async (accessToken) => {
    try {
      const response = await axios.get("http://localhost:8002/board/list/0", {
        headers: {
          ACCESS_TOKEN: accessToken,
        },
      });

      if (response.status === 200) {
        setPosts(response.data.data);
        setIsLoading(false);
      } else {
        console.error("게시글 로딩 실패");
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <div className="Approval" style={{ margin: "0", backgroundColor: "#f2f2f2" }}>
      <ApprovalList isLoading={isLoading} posts={posts} isError={isError} fetchData={fetchData} />
    </div>
  );
};

export default Approval;
