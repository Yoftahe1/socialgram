import React, { useRef, useContext } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { RiSendPlane2Line } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import Profile from "./profile";
import Context from "../store/context";
import styles from "./comments.module.css";
import useComment from "../logic/useComment";
const Comments = () => {
  const commentRef = useRef();
  const params = useParams();
  const ctx = useContext(Context);
  const topRef = useRef();
  const navigate=useNavigate()
  const {comments,comment,deleteComment}=useComment(params.id)
  return (
    <div className={styles.comments} ref={topRef}>
      <div className={styles.topBar}>
        <div onClick={()=>navigate(-1)} className={styles.back}>
          <BiArrowBack />
        </div>
        <h3>Comments</h3>
      </div>
      <div className={styles.middleBar}>
        {comments.map((element, index) => {
          return (
            <div key={index} className={styles.comment}>
              <div>
                <Profile
                  username={element.users.username}
                  image={element.users.image}
                  date={element.created_at}
                />
                <p className={styles.description}>{element.content}</p>
              </div>
              {ctx.user.id===element.posts.user_id?<div
                className={styles.svg}
                onClick={() => deleteComment(element.id)}
              >
                <MdDeleteOutline />
              </div>:ctx.user.id===element.users.id&&<div
                className={styles.svg}
                onClick={() => deleteComment(element.id)}
              >
                <MdDeleteOutline />
              </div>}
            </div>
          );
        })}
      </div>
      <div className={styles.messageBar}>
        <input
          ref={commentRef}
          className={styles.input}
          placeholder="Enter message"
        />
        <RiSendPlane2Line className={styles.button} onClick={()=>comment(commentRef,topRef)} />
      </div>
    </div>
  );
};

export default Comments;
