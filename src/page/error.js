import React from "react";
import { useNavigate } from "react-router-dom";
import error from "../assets/error.gif";
import styles from"./error.module.css";

const Error = () => {
  const navigate=useNavigate()
  return (

    <div className={styles.error}>
      <div>
        <h1 className={styles.error404}>404</h1>
        <img className={styles.errorImage} src={error} alt="error" />
        <h3>Look like you're lost</h3>
        <p>the page you are looking for not available!</p>
        <div className={styles.errorButton} onClick={()=>navigate(-1)}>Go to back</div>
      </div>
    </div>
  );
};

export default Error;
