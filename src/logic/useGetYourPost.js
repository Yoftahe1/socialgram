import { useState, useEffect, useContext } from "react";
import Context from "../store/context";
import { supabase } from "../supabaseClient";
const useGetYourPost = () => {
  const ctx = useContext(Context);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const { data, error } = await supabase
        .from("postsview")
        
        .select(
          `
          description,created_at,image,id,comment_count,
          users (username,image)
        `
        )
        .eq("user_id", ctx.user.id)
        .order("created_at", { ascending: false });
      if (data) {
        setPosts(data);
      } else {
        console.log(error);
      }
    }
    getPosts();
  }, [ctx.user.id]);
  return posts;
};

export default useGetYourPost;
