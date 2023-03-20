import { useState, useEffect, useContext } from "react";
import Context from "../store/context";
import { supabase } from "../supabaseClient";

const useGetFriends = () => {
  const [friends, setFriends] = useState([]);

  const ctx = useContext(Context);
  useEffect(() => {
    async function getFriends() {
      const { data, error } = await supabase
        .from("friendsview")
        .select()
        .or(`accepter.eq.${ctx.user.id},requester.eq.${ctx.user.id}`);
      if (data) {
        let temp = [];
        data.map((element) => {
          if (element.accepter === ctx.user.id) {
            return (temp = [
              ...temp,
              [
                element.requester,
                element.requestername,
                element.requesterimage,
                element.friendid,
              ],
            ]);
          } else {
            return (temp = [
              ...temp,
              [
                element.accepter,
                element.acceptername,
                element.accepterimage,
                element.friendid,
              ],
            ]);
          }
        });

        setFriends(temp);
      } else {
        console.log(error);
      }
    }
    getFriends();
    const myChannel = supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "friends" },
        () => {
          getFriends();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(myChannel);
    };
  }, [ctx.user.id]);
  return { friends };
};

export default useGetFriends;
