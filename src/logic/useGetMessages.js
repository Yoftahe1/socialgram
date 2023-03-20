import { useState, useEffect, useContext } from "react";
import Context from "../store/context";
import { supabase } from "../supabaseClient";
const useGetMessages = () => {
  const [messages, setMessages] = useState([]);
  const ctx = useContext(Context);
  useEffect(() => {
    async function getMessages() {
      const { data, error } = await supabase
        .from("messages")
        .select()
        .eq("friend_id", ctx.chat.id);
      if (data) {
        setMessages(data);
      }
      if (error) {
        console.log(error);
      }
    }
    getMessages();

    const myChannel = supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        (payload) => {
          getMessages();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(myChannel);
    };
  }, [ctx.chat.id]);
  async function send(messageRef) {
    if (messageRef.current.value) {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          sender: ctx.user.id,
          friend_id: ctx.chat.id,
          message: messageRef.current.value,
        })
        .select();
      if (data) {
        console.log("sent");
      } else {
        console.log(error);
      }
    }
    messageRef.current.value = null;
  }
  return { messages ,send};
};

export default useGetMessages;
