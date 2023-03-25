import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Context from "../store/context";
const useSign = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const ctx = useContext(Context);
  const navigate = useNavigate();
  async function log(emailRef,passwordRef,usernameRef,isSignIn) {
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
            localStorage.setItem('user',JSON.stringify(response.data))
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
        const { data, error } = await supabase.auth.signUp({
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
            localStorage.setItem('user',JSON.stringify(response.data))
            ctx.setUser(response.data);
            navigate("/posts");
          } else {
            setError("Something went wrong");
          }
        } else {
          if (
            error.message === "Unable to validate email address: invalid format"
          ) {
            setError("Please provide valid email address");
          } else if (error.message === "User already registered") {
            setError("User already exists");
          } else if (
            error.message === "Password should be at least 6 characters"
          ) {
            setError("Password should be at least 6 characters");
          } else {
            setError("Something went wrong");
          }
        }
      } else {
        setError("Please provide all inputs");
      }
    }
    setLoading(false);
  }
  return {log,error,setError,loading};
};

export default useSign;
