import React, { useContext } from "react";
import Profile from "./profile";
import styles from "./chats.module.css";
import { useNavigate } from "react-router-dom";
import Context from "../store/context";
import useGetFriends from "../logic/useGetFriends";

const Chats = () => {
  const navigate = useNavigate();
  const ctx = useContext(Context);
  const { friends } = useGetFriends();

  return (
    <div className={styles.chats}>
      {friends.map((element, index) => {
        return (
          <div
            key={index}
            className={styles.user}
            onClick={() => {
              ctx.setChat(element[3], element[1], element[2], element[0]);
              navigate("/chats/friends/2");
            }}
          >
            <Profile username={element[1]} image={element[2]} id={element[0]} />
          </div>
        );
      })}
    </div>
  );
};

export default Chats;
