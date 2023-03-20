import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineHome } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { RiAddBoxLine } from "react-icons/ri";
import styles from "./sidebar.module.css";
const Sidebar = () => {
  return (<>
    <div className={styles.sidebar}>
      <div className={styles.logo}>Socialgram</div>
      <div className={styles.links}>
        <NavLink to='/posts' className={({isActive})=>isActive ? styles.active : styles.link}>
          <MdOutlineHome />
          <p className={styles.linkName}>Home</p>
        </NavLink>
        <NavLink to='/search' className={({isActive})=>isActive ? styles.active : styles.link}>
          <BsSearch />
          <p className={styles.linkName}>Search</p>
        </NavLink>
        <NavLink to='/create' className={({isActive})=>isActive ? styles.active : styles.link}>
          <RiAddBoxLine />
          <p className={styles.linkName}>Create</p>
        </NavLink>
        <NavLink to='/chats' className={({isActive})=>isActive ? styles.active : styles.link}>
          <IoPaperPlaneOutline />
          <p className={styles.linkName}>Message</p>
        </NavLink>
        <NavLink to='/profile' className={({isActive})=>isActive ? styles.active : styles.link}>
          <BiUserCircle />
          <p className={styles.linkName}>Profile</p>
        </NavLink>
        <NavLink to='/' className={styles.logout}>
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
