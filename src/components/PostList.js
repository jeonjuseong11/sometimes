import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = "YOUR_ACCESS_TOKEN";
        const response = await axios.get("http://localhost:8080/board/list", {
          headers: {
            ACCESS_TOKEN: accessToken,
          },
        });

        if (response.status === 200) {
          setPosts(response.data);
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

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          backgroundColor: "#f2f2f2",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "5rem",
        }}
      >
        <h3>Loading...</h3>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        style={{
          backgroundColor: "#f2f2f2",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "5rem",
        }}
      >
        <h2>글 로드에 실패하였습니다.</h2>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "#f2f2f2",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "5rem",
        }}
      >
        <h2>글이 없습니다.</h2>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
        />
      ))}
    </div>
  );
};

export default PostList;
