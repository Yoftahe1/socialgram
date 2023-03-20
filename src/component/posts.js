import React, { useRef } from "react";
import Post from "./post";
import { FaArrowUp } from "react-icons/fa";
import styles from "./posts.module.css";
import useGetPosts from "../logic/useGetPosts";
const Posts = () => {
  const topRef = useRef();
  const { posts, thereIsNew } = useGetPosts();
  return (
    <div ref={topRef} className={styles.posts} id="posts">
      {thereIsNew && (
        <div
          className={styles.new}
          onClick={() => topRef.current.scrollIntoView()}
        >
          <FaArrowUp /> New Post
        </div>
      )}

      {posts.map((element, index) => { 

        return <Post key={index} elements={element} />;
      })}
    </div>
  );
};

export default Posts;
