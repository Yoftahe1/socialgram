import React, { useCallback, useContext, useEffect, useState } from "react";
import Profile from "./profile";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FcLikePlaceholder } from "react-icons/fc";
import { BiCommentDetail } from "react-icons/bi";
import { FiShare2 } from "react-icons/fi";
import styles from "./post.module.css";
import { NavLink } from "react-router-dom";
import Context from "../store/context";
import { supabase } from "../supabaseClient";
import useLike from "../logic/useLike";
const Post = (props) => {
  const { likes, like } = useLike(props.elements.id);
  const ctx = useContext(Context);
  return (
    <div className={styles.post}>
      <Profile
        username={props.elements.users.username}
        image={props.elements.users.image}
        id={props.elements.users.id}
        date={props.elements.created_at}
      />
      <div className={styles.imageAndInteractions}>
        <p className={styles.description}>{props.elements.description}</p>
        {props.elements.image && (
          <img src={props.elements.image} alt="post" className={styles.image} />
        )}
        <div className={styles.interactions}>
          <div
            className={styles.button}
            onClick={() => like(props.elements.id)}
          >
            {likes.includes(`${ctx.user.id}`) ? (
              <FcLikePlaceholder />
            ) : (
              <MdOutlineFavoriteBorder />
            )}
            <p className={styles.type}>
              {likes.length}
              <span className={styles.typeName}>Like</span>{" "}
            </p>
          </div>
          <NavLink
            to={`/posts/comments/${props.elements.id}`}
            className={styles.button}
          >
            <BiCommentDetail />
            <p className={styles.type}>
              {props.elements.comment_count ? props.elements.comment_count : 0}{" "}
              <span className={styles.typeName}>Comment</span>
            </p>
          </NavLink>
          <div className={styles.button}>
            <FiShare2 />
            <p className={styles.type}>
              <span className={styles.typeName}>Share</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
