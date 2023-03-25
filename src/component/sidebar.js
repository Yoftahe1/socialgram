import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineHome } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { RiAddBoxLine } from "react-icons/ri";
import Context from "../store/context";
import styles from "./sidebar.module.css";
const Sidebar = () => {
  const ctx = useContext(Context);
  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.logo}>Socialgram</div>
        <div className={styles.logoSvg}>
          <svg viewBox="0 0 1000 1000">
            <path
              fill="#0081c9"
              d="M433,433.29V395.14l55.65,20.44c59.08,21.66,118.13,43.45,177.31,64.85,7.62,2.76,10.6,6.3,10.48,14.83-.51,35-.06,70-.06,105,0,45.2-30.8,76.08-76,76.09-66.52,0-133-.79-199.57.11-45.55.61-80.33-35-76.94-77.39,1-12.95.16-26,.16-40.56,10.76,3.88,20.61,6.92,29.94,11.12,2.52,1.13,4.67,5.66,4.91,8.79.67,8.41-.11,16.92.26,25.36,1,22.78,14.93,36.1,37.62,36.11q102.09,0,204.18-.05c25.61,0,39.25-13.59,39.32-38.95.08-27.3-.25-54.61.34-81.9.17-8-2.52-11.29-9.82-13.9-63.22-22.63-126.3-45.67-189.41-68.6C438.5,435.44,435.7,434.33,433,433.29Z"
            />
            <path
              fill="#0081c9"
              d="M675.52,440.22c-34.81-11.07-34.81-11.07-35-44.89-.09-19.74-12.13-33.55-31.57-35.93a120.34,120.34,0,0,0-15-.74q-96.35.39-192.7.9c-29.41.15-41.8,12.58-42,42.32-.15,25.77.17,51.55-.32,77.31-.16,8.09,2.14,12.16,10.19,15,61.81,22.1,123.36,44.93,185.19,67,8.94,3.19,13.49,6.89,12.28,16.92-.91,7.58-.18,15.35-.18,24.66-3-.54-5.78-.62-8.22-1.52-75-27.34-149.95-54.88-225-82-7.49-2.71-9.68-6.45-9.6-14.16.37-36.54,0-73.08.12-109.62.18-41.58,30.56-71.91,72.07-71.9q101.55,0,203.09.37c43.54.1,72,25,76.34,68.15C676.83,407.58,675.52,423.35,675.52,440.22Z"
            />
          </svg>
        </div>
        <div className={styles.links}>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <MdOutlineHome />
            <p className={styles.linkName}>Home</p>
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <BsSearch />
            <p className={styles.linkName}>Search</p>
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <RiAddBoxLine />
            <p className={styles.linkName}>Create</p>
          </NavLink>
          <NavLink
            to="/chats"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <IoPaperPlaneOutline />
            <p className={styles.linkName}>Message</p>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <BiUserCircle />
            <p className={styles.linkName}>Profile</p>
          </NavLink>
          <NavLink
            to="/"
            onClick={() => {
              localStorage.removeItem("user");
              ctx.setUser({});
            }}
            className={styles.logout}
          >
            <BiLogOut />
            <p className={styles.linkName}>Log Out</p>
          </NavLink>
        </div>
      </div>
      <div className={styles.sidebarPlaceholder}></div>
    </>
  );
};

export default Sidebar;
