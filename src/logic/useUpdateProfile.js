import { useEffect, useContext, useRef } from "react";
import { supabase } from "../supabaseClient";
import Context from "../store/context";
const useUpdateProfile = (posting) => {
  const postingRef = useRef();
  const ctx = useContext(Context);
  useEffect(() => {
    postingRef.current = posting;
  }, [posting]);
  let url = null;
  async function getUrl(path) {
    const { data, error } = supabase.storage.from("users").getPublicUrl(path);
    if (data) {
      url = data.publicUrl;
    } else {
      console.log(error);
    }
  }

  async function update(usernameRef, setIsLoading, image, bioRef, setPosting) {
    if (usernameRef.current.value.length > 0) {
      setIsLoading(true);
      if (image) {
        const { data, error } = await supabase.storage
          .from("users")
          .update(`${ctx.user.id}/image`, image, { upsert: true });
        if (data) {
          getUrl(data.path);
        } else {
          if (error.message === "The resource was not found") {
            const { data, error } = await supabase.storage
              .from("users")
              .upload(`${ctx.user.id}/image`, image, { upsert: false });
            if (data) {
              getUrl(data.path);
            } else {
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
          }
        }
        const response = await supabase
          .from("users")
          .upsert({
            id: ctx.user.id,
            username: usernameRef.current.value,
            bio: bioRef.current.value,
            image: url,
          })
          .eq("id", ctx.user.id)
          .select()
          .single();
        if (response.data) {
          setIsLoading(false);
          setPosting({
            message:
              "Updated successfully,update will be visible next time you log in",
            isError: false,
            isSuccess: true,
          });
          setTimeout(() => {
            setPosting({ message: "", isError: false, isSuccess: false });
          }, 2000);
          ctx.setUser(response.data);
        } else {
          setIsLoading(false);
          setPosting({ message: "Something went wrong", isError: true });
          setTimeout(() => {
            setPosting({ message: "", isError: false });
          }, 2000);
          console.log(response.error);
        }
      } else {
        const { data, error } = await supabase
          .from("users")
          .update({
            username: usernameRef.current.value,
            bio: bioRef.current.value,
          })
          .eq("id", ctx.user.id)
          .select()
          .single();
        if (data) {
          setIsLoading(false);
          setPosting({
            message: "Updated successfully",
            isError: false,
            isSuccess: true,
          });
          setTimeout(() => {
            setPosting({ message: "", isError: false, isSuccess: false });
          }, 2000);
          ctx.setUser(data);
        } else {
          setIsLoading(false);
          setPosting({ message: "Something went wrong", isError: true });
          setTimeout(() => {
            setPosting({ message: "", isError: false });
          }, 2000);
          console.log(error);
        }
      }
    } else {
      setPosting({ message: "Username can't be empty", isError: true });
      setTimeout(() => {
        setPosting({ message: "", isError: false });
      }, 2000);
    }
  }
  return { update };
};

export default useUpdateProfile;
