import React, { useEffect, useState } from "react";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApprovalList from "../components/ApprovalList";

const Approval = () => {
  const userInfo = localStorage.getItem("userInfo");
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, []);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const fetchData = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    try {
      const response = await axios.get(
        `https://io065rlls1.execute-api.ap-northeast-2.amazonaws.com/board/list/0`,
        {
          headers: {
            ACCESS_TOKEN: userInfo.access_TOKEN,
          },
        }
      );

      if (response.status === 200) {
        setPosts(response.data.data);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch posts.");
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      console.error("Error occurred while fetching posts:", error);
      setIsLoading(false);
      setIsError(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Approval" style={{ margin: "0", backgroundColor: "#f2f2f2" }}>
      <ApprovalList isLoading={isLoading} posts={posts} isError={isError} fetchData={fetchData} />
    </div>
  );
};

export default Approval;
