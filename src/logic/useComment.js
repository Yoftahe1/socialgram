import { useState, useEffect,useContext } from "react";
import { supabase } from "../supabaseClient";
import Context from "../store/context";
const useComment = (prop) => {
  const [comments, setComments] = useState([]);
  const ctx = useContext(Context);
  useEffect(() => {
    async function getComments() {
      const { data, error } = await supabase
        .from("comments")
        .select(`id,content,created_at,users(id,username,image),posts(user_id)`)
        .eq("post_id", prop)
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
  }, [prop]);
  async function comment(commentRef,topRef) {
    if (commentRef.current.value) {
      const { data, error } = await supabase
        .from("comments")
        .insert({
          user_id: ctx.user.id,
          post_id: prop,
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
  return {comments,comment,deleteComment};
};

export default useComment;
