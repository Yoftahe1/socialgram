import React, { useState, useEffect, useRef, useContext } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { RiSendPlane2Line } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { supabase } from "../supabaseClient";
import Profile from "./profile";
import Context from "../store/context";
import styles from "./comments.module.css";
const Comments = () => {
  const [comments, setComments] = useState([]);
  const commentRef = useRef();
  const params = useParams();
  const ctx = useContext(Context);
  const topRef = useRef();
  const navigate=useNavigate()
  useEffect(() => {
    async function getComments() {
      const { data, error } = await supabase
        .from("comments")
        .select(`id,content,created_at,users(id,username,image),posts(user_id)`)
        .eq("post_id", params.id)
        .order("created_at", { ascending: false });
      if (data) {
        setComments(data);
      }
      if (error) {
        console.log(error);
      }
    }
    getComments();

    const myChannel = supabase
      .channel("any")
      .on(
        "postgres_changes",

        { event: "*", schema: "public", table: "comments" },
        () => {
          getComments();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(myChannel);
    };
  }, [params.id]);

  async function comment() {
    if (commentRef.current.value) {
      const { data, error } = await supabase
        .from("comments")
        .insert({
          user_id: ctx.user.id,
          post_id: params.id,
          content: commentRef.current.value,
        })
        .select();
      if (data) {
        topRef.current.scrollIntoView();
        commentRef.current.value = null;
      } else {
        console.log(error);
      }
    }
  }
  async function deleteComment(id) {
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) {
      console.log(error);
    } else {
      console.log("deleted");
    }
  }
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
        <RiSendPlane2Line className={styles.button} onClick={comment} />
      </div>
    </div>
  );
};

export default Comments;
