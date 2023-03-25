import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
const useGetPosts = () => {
  const [posts, setPosts] = useState([]);
  const [thereIsNew, setThereIsNew] = useState(false);
  useEffect(() => {
    async function getPosts() {
      const { data, error } = await supabase
        .from("postsview")
        .select(
          `
          description,created_at,image,id,comment_count,
          users (username,image,id)
        `
        )
        .order("created_at", { ascending: false });
      if (data) {
        setPosts(data);
      } else {
        console.log(error);
      }
    }
    getPosts();

    const myChannel = supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "posts" },
        () => {
          getPosts();
          setThereIsNew(false);
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        handelPost
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "comments" },
        handelComment
      )
      .subscribe();

    function handelPost() {
      getPosts();
      const position = window.pageYOffset;
      if (position > 100) {
        setThereIsNew(true);
      }
    }
    function handelComment() {
      getPosts();
    }

    window.addEventListener("scroll", listenToScroll);

    return () => {
      supabase.removeChannel(myChannel);
      window.removeEventListener("scroll", listenToScroll);
    };
  }, []);

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll < 200) {
      setThereIsNew(false);
    }
  };
  return { posts, thereIsNew };
};

export default useGetPosts;
