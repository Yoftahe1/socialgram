import React, { useContext } from "react";
import Profile from "./profile";
import useGetFriends from "../logic/useGetFriends";
import styles from "./rightSidebar.module.css";
import Context from "../store/context";
import { useNavigate } from "react-router-dom";
const RightSidebar = () => {
  const { friends } = useGetFriends();
  const ctx=useContext(Context)
  const navigate=useNavigate()
  return (
    <>
      <div className={styles.rightSidebar}>
        <div className={styles.topBar}>Friends</div>
        <div className={styles.friends}>
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
                <Profile
                  id={element[0]}
                  username={element[1]}
                  image={element[2]}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.rightSidebarPlaceholder}></div>
    </>
  );
};

export default RightSidebar;
