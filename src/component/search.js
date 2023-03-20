import React, { useContext, useState } from "react";
import Profile from "./profile";
import { FiUserPlus } from "react-icons/fi";
import { supabase } from "../supabaseClient";
import styles from "./search.module.css";
import Context from "../store/context";
import useGetFriends from "../logic/useGetFriends";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const [users, setUsers] = useState([]);
  const ctx = useContext(Context);
  const { friends } = useGetFriends();
  const navigate = useNavigate();
  async function search(event) {
    setUsers([]);
    if (event.target.value) {
      const { data, error } = await supabase
        .from("users")
        .select()
        .ilike("username", `${event.target.value}%`);
      if (data) {
        setUsers(data);
      } else {
        console.log(error);
      }
    }
  }
  async function addFriend(id) {
    const { data, error } = await supabase
      .from("friends")
      .insert({
        requester: ctx.user.id,
        accepter: id,
      })
      .select();
    if (data) {
      console.log("added");
    } else {
      console.log(error);
    }
  }

  return (
    <div className={styles.search}>
      <div className={styles.topBar}>
        <h3>Search by username</h3>
        <input
          className={styles.input}
          onChange={search}
          placeholder="Enter username you want to search"
        />
      </div>
      <div>
        {users.map((element, index) => {
          let ids = friends.map((element) => {
            return element[0];
          });
          return (
            <div
              className={styles.user}
              key={index}
              onClick={() => {
                if (ids.includes(element.id)) {
                  ctx.setChat(
                    friends[ids.indexOf(element.id)][3],
                    element.username,
                    element.image,
                    element.id
                  );
                  navigate("/chats/friends/2");
                }
              }}
            >
              <Profile
                username={element.username}
                image={element.image}
                id={element.id}
              />
              {!ids.includes(element.id) && (
                <button
                  className={styles.button}
                  onClick={() => addFriend(element.id)}
                >
                  <FiUserPlus />
                  <p>Add friend</p>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
