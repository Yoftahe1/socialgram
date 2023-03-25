import React, { useState, useRef } from "react";
import styles from "./sign.module.css";
import useSign from "../logic/useSign";
const Sign = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const { log, error, setError, loading } = useSign();
  return (
    <div className={styles.sign}>
      <div className={styles.form}>
        <h1>{isSignIn ? "Sign-In" : "Sign-Up"}</h1>
        <p className={styles.inputType}>Email</p>
        <input
          ref={emailRef}
          placeholder="Enter Email Address"
          defaultValue="test@test.com"
          className={styles.input}
        />
        <p className={styles.inputType}>Password</p>
        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter Password"
          defaultValue="test@test"
          className={styles.input}
        />
        {!isSignIn && (
          <>
            <p className={styles.inputType}>Username</p>
            <input
              ref={usernameRef}
              placeholder="Enter Username"
              className={styles.input}
            />
          </>
        )}
        {error && <p className={styles.error}>{error}</p>}
        {isSignIn && <p className={styles.forgot}>Forgot Password?</p>}
        <button
          className={styles.button}
          onClick={() =>
            log(
              emailRef,
              passwordRef,
              usernameRef,
              isSignIn
            )
          }
        >
          {isSignIn ? "Sign-In" : "Sign-Up"}
        </button>

        {isSignIn ? (
          <p>
            Don't have an account?{" "}
            <span
              className={styles.type}
              onClick={() => {
                setError(null);
                setIsSignIn((prev) => !prev);
              }}
            >
              Sign-Up
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              className={styles.type}
              onClick={() => {
                setError(null);
                setIsSignIn((prev) => !prev);
              }}
            >
              Sign-In
            </span>
          </p>
        )}
        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.loading}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sign;
