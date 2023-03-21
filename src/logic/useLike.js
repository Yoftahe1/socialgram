import {useState,useContext, useEffect,useCallback} from 'react'
import { supabase } from "../supabaseClient";

import Context from '../store/context';
const useLike = (id) => {
    const ctx=useContext(Context)
  const [likes, setLikes] = useState([]);

    const getLikes = useCallback(async () => {
        const { data, error } = await supabase
          .from("likes")
          .select(`user_id`)
          .eq("post_id", id);
        if (data) {
          const temp = [];
          data.forEach((element) => {
            temp.push(element.user_id);
          });
          setLikes(temp);
        } else {
          console.log(error);
        }
      },[id]);
      useEffect(() => {
        getLikes();
      }, [getLikes]);
    
      async function like(id) {
        const { data, error } = await supabase
          .from("likes")
          .insert({ post_id: id, user_id: ctx.user.id })
          .select();
        if (data) {
          console.log("liked");
          getLikes();
        } else {
          if (
            error.message ===
            'duplicate key value violates unique constraint "like_constraint"'
          ) {
            const { error } = await supabase
              .from("likes")
              .delete()
              .match({ post_id: id, user_id: ctx.user.id });
            getLikes();
            if(error){
              console.log(error)
            }
          }
        }
      }
  return {likes,like}
}

export default useLike