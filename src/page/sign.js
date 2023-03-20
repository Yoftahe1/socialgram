import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./sign.module.css";
import { supabase } from "../supabaseClient";
import Context from "../store/context";
const Sign = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const ctx = useContext(Context);
  const navigate = useNavigate();

  async function log() {
    setError(null);
    setLoading(true);
    if (isSignIn) {
      if (emailRef.current.value && passwordRef.current.value) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
        if (data.user) {
          const response = await supabase
            .from("users")
            .select()
            .eq("id", data.user.id)
            .single();
          if (response.data) {
            ctx.setUser(response.data);
            navigate("/posts");
          } else {
            setError("Something went wrong");
          }
        } else {
          if (error.message === "Invalid login credentials") {
            setError("Invalid login credentials");
          } else {
            setError("Something went wrong");
          }
        }
      } else {
        setError("Please provide all inputs");
      }
    } else {
      if (
        emailRef.current.value &&
        passwordRef.current.value &&
        usernameRef.current.value
      ) {
        const { data ,error} = await supabase.auth.signUp({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
        if (data.user) {
          const response = await supabase
            .from("users")
            .insert({ id: data.user.id, username: usernameRef.current.value })
            .select()
            .single();
          if (response.data) {
            ctx.setUser(response.data);
            navigate("/posts");
          } else {
            setError("Something went wrong");
          }
        } else {
          if (error.message === "Unable to validate email address: invalid format") {
            setError("Please provide valid email address");
          } 
          else if (error.message === "User already registered") {
            setError("User already exists");
          }
          else if(error.message==="Password should be at least 6 characters"){
            setError("Password should be at least 6 characters")
          }
          else {
            setError("Something went wrong");
          }

        }
      } else {
        setError("Please provide all inputs");
      }
    }
    setLoading(false);
  }
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
        <button className={styles.button} onClick={log}>
          {isSignIn ? "Sign-In" : "Sign-Up"}
        </button>

        {isSignIn ? (
          <p>
            Don't have an account?{" "}
            <span
              className={styles.type}
              onClick={() => {setError(null);setIsSignIn(prev=>!prev);}}
            >
              Sign-Up
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              className={styles.type}
              onClick={() =>{setError(null); setIsSignIn(prev=>!prev)}}
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
