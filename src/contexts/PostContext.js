import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import { decryptData } from "../utils/decryptData";

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchPosts = useCallback(
    async (page) => {
      if (!hasMore || isLoading) {
        return;
      }

      setIsLoading(true);

      try {
        const encryptedUserInfo = localStorage.getItem("userInfo");
        const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;
        const decryptedUserInfo = decryptData(encryptedUserInfo, encryptionKey);
        const userInfo = JSON.parse(decryptedUserInfo);

        const response = await axios.get(
          `https://io065rlls1.execute-api.ap-northeast-2.amazonaws.com/board/pageList?page=${page}&size=5`,
          {
            headers: {
              ACCESS_TOKEN: userInfo.access_TOKEN,
            },
          }
        );

        if (response.status === 200) {
          const newPosts = response.data.data.content;

          if (newPosts.length === 0) {
            setHasMore(false);
          } else {
            setPosts((prevPosts) => {
              const postIds = prevPosts.map((post) => post.id);
              const filteredPosts = newPosts.filter((post) => !postIds.includes(post.id));
              return [...prevPosts, ...filteredPosts];
            });
          }

          if (response.data.data.last) {
            setHasMore(false);
          }
        } else {
          alert("게시글 불러오기 실패");
        }
      } catch (error) {
        console.error("게시글 가져오기 에러:", error);
        alert("게시글 불러오기 실패");
      } finally {
        setIsLoading(false);
      }
    },
    [hasMore, isLoading]
  );

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        isLoading,
        setIsLoading,
        hasMore,
        setHasMore,
        currentPage,
        setCurrentPage,
        fetchPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
