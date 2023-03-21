import { useEffect, useRef, useContext } from "react";
import Context from "../store/context";
import { supabase } from "../supabaseClient";
const usePost = (posting) => {
  const postingRef = useRef();
  const ctx = useContext(Context);
  useEffect(() => {
    postingRef.current = posting;
  }, [posting]);
//   function addToPost(event,setImage,setPreview) {
//     setImage(event.target.files[0]);
//     const reader = new FileReader();
//     if (event?.target.files[0]) {
//       reader.readAsDataURL(event.target.files[0]);
//     }
//     reader.onload = (readerEvent) => {
//       setPreview(readerEvent.target?.result);
//     };
//   }
  let url;
  async function post(descriptionRef,setIsLoading,image,setPosting,setPreview) {
    if (descriptionRef.current.value) {
      setIsLoading(true);
      if (image) {
        const date = new Date();
        const { data, error } = await supabase.storage
          .from("posts")
          .upload(`${ctx.user.id}/${date.toISOString()}`, image);
        if (data) {
          getUrl(data.path);
          const { post, error } = await supabase
            .from("posts")
            .insert({
              user_id: ctx.user.id,
              description: descriptionRef.current.value,
              image: url,
            })
            .select();
          if (post) {
            console.log("posted");
          } else {
            console.log(error);
          }
        } else {
          console.log(error);
          setPosting({ message: "Something went wrong", isError: true });
          setTimeout(() => {
            setPosting({ message: "", isError: false, isSuccess: false });
          }, 2000);
        }
      } else {
        const { data, error } = await supabase
          .from("posts")
          .insert({
            user_id: ctx.user.id,
            description: descriptionRef.current.value,
          })
          .select();
        if (data) {
          setPosting({ message: "posted successfully", isSuccess: true });
          setTimeout(() => {
            setPosting({ message: "", isError: false, isSuccess: false });
          }, 2000);
        } else {
          setPosting({ message: error.message, isError: true });
          setTimeout(() => {
            setPosting({ message: "", isError: false, isSuccess: false });
          }, 2000);
          console.log(error);
        }
      }

      setIsLoading(false);
      setPreview(null);
      descriptionRef.current.value = null;
    }
  }
  async function getUrl(path) {
    const { data, error } = supabase.storage.from("posts").getPublicUrl(path);
    if (data) {
      url = data.publicUrl;
    } else {
      console.log(error);
    }
  }
  return { post };
};

export default usePost;
