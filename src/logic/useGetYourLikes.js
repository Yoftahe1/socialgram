import { useContext, useEffect ,useState} from "react";
import Context from "../store/context";
import { supabase } from "../supabaseClient";
const useGetYourLikes = () => {
  const ctx=useContext(Context)
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getLikes() {
      const { data, error } = await supabase.from("likedview").select().eq('user_id',ctx.user.id);
      if (data) {
        setPosts(data);
      } else {
        console.log(error);
      }
    }
    getLikes()
  }, [ctx.user.id]);
  return posts;
};

export default useGetYourLikes;
