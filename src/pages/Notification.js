import React, { useEffect, useState } from "react";
import "../styles.css";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Notification = () => {
  const userInfo = localStorage.getItem("userInfo");
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, []);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const fetchData = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    try {
      const response = await axios.get(`http://localhost:8002/board/list/${userInfo.school_NO}`, {
        headers: {
          ACCESS_TOKEN: userInfo.access_TOKEN,
        },
      });

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
    <div
      className="Notification"
      style={{ margin: "0", backgroundColor: "#f2f2f2", paddingTop: "1rem" }}
    >
      <PostList isLoading={isLoading} posts={posts} isError={isError} fetchData={fetchData} />
    </div>
  );
};

export default Notification;
