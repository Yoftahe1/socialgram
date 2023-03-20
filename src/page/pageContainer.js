import React, { useContext, useEffect } from "react";
import Sidebar from "../component/sidebar";
import RightSidebar from "../component/rightSidebar";
import { BiLogOut } from "react-icons/bi";
import styles from "./pageContainer.module.css";
import { useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Context from "../store/context";
const PageContainer = (props) => {
  const location = useLocation();
  const ctx = useContext(Context);
  useEffect(() => {
    const channel = supabase.channel("online-users", {
      config: {
        presence: {
          key: ctx.user.id,
        },
      },
    });

    channel.on("presence", { event: "sync" }, () => {
      ctx.setOnline(Object.keys(channel.presenceState()));
    });

    channel.on("presence", { event: "join" }, ({ newPresences }) => {
      // console.log('New users have joined: ', newPresences)
    });

    channel.on("presence", { event: "leave" }, ({ leftPresences }) => {
      // console.log('Users have left: ', leftPresences)
    });

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({ online_at: new Date().toISOString() });
        // console.log(status)
      }
    });
  }, [ctx.user.id]);
  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      {!location.pathname.startsWith("/chats/") &&
        !location.pathname.startsWith("/posts/comments") && (
          <div className={styles.logo}>
            <p>Socialgram</p>
            <div className={styles.logout}>
              <BiLogOut />
            </div>
          </div>
        )}
      {props.children}
      <RightSidebar />
    </div>
  );
};

export default PageContainer;
