import React, { useContext } from "react";
import styles from "./profile.module.css";
import Context from "../store/context";
const Profile = (props) => {
  const ctx=useContext(Context)
  let created_at;
  let today = new Date().getDate().toLocaleString();
  if (props.date) {
    created_at = new Date(props.date).getDate().toLocaleString();
  }
  return (
    <div className={styles.profile}>
      {props.image ? (
        <div>
          {ctx.online.includes(props.id)&&<div className={styles.online}></div>}
          <img className={styles.image} src={props.image} alt="profile pic" />
        </div>
      ) : (
        <div className={styles.background}>
          {ctx.online.includes(props.id)&&<div className={styles.online}></div>}
        </div>
      )}
      <div className={styles.usernameAndLast}>
        <p className={styles.username}>
          {props.username ? props.username : "username"}
        </p>
        <p className={styles.last}>
          {props.date ? `${today - created_at } days ago`: ctx.online.includes(props.id)?'Online':'Offline'} 
        </p>
      </div>
    </div>
  );
};

export default Profile;
