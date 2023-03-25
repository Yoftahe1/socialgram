import { useContext, useEffect ,useState} from "react";
import Context from "../store/context";
import { supabase } from "../supabaseClient";
const useGetYourLikes = () => {
  const ctx=useContext(Context)
  const [liked, setLiked] = useState([]);
  useEffect(() => {
    async function getLikes() {
      const { data, error } = await supabase.from("likedview").select().eq('user_id',ctx.user.id);
      if (data) {
        setLiked(data);
      } else {
        console.log(error);
      }
    }
    getLikes()
  }, [ctx.user.id]);
  return {liked,setLiked};
};

export default useGetYourLikes;
