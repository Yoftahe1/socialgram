import React, { useContext, useRef } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { HiOutlinePaperClip } from "react-icons/hi";
import { RiSendPlane2Line } from "react-icons/ri";
import Profile from "./profile";
import Context from "../store/context";
import styles from "./chat.module.css";
import useGetMessages from "../logic/useGetMessages";
const Chat = () => {
  const messageRef = useRef();
  const ctx = useContext(Context);
  const navigate = useNavigate();
  const { messages ,send} = useGetMessages();
  return (
    <div className={styles.chat}>
      <div className={styles.topBar}>
        <div onClick={() => navigate(-1)} className={styles.back}>
          <BiArrowBack />
        </div>
        <Profile
          username={ctx.chat.username}
          image={ctx.chat.image}
          id={ctx.chat.userId}
        />
      </div>
      <div className={styles.messages}>
        {messages.map((element, index) => {
          const date = new Date(element.created_at).getDate().toLocaleString();
          const today = new Date().getDate().toLocaleString();
          let time = today - date;
          return (
            <div
              className={
                element.sender === ctx.user.id ? styles.sender : styles.receiver
              }
              key={index}
            >
              <div>
                <p>{element.message}</p>
                <p className={styles.time}>{`${time} days ago`}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.messageBar}>
        <div className={styles.button}>
          <HiOutlinePaperClip />
        </div>

        <input
          className={styles.input}
          placeholder="Enter message"
          ref={messageRef}
        />
        <div className={styles.button} onClick={()=>send(messageRef)}>
          <RiSendPlane2Line />
        </div>
      </div>
    </div>
  );
};

export default Chat;
