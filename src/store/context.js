import { useState, createContext } from "react";
const Context = createContext({
  chat: {},
  user: {},
  online:[],
  setChat: (id, name,image,userId) => {},
  setUser: (user) => {},
  setOnline:(users)=>{},
});
export function ContextProvider(props) {
  const [chat, setNewChat] = useState({});
  const [user, setNewUser] = useState({});
  const [online,setNewOnline]=useState([])
  function setChat(id, username,image,userId) {
    setNewChat({ id, username ,image,userId});
  }
  function setUser(user) {
    setNewUser(user);
  }
  function setOnline(users) {
    setNewOnline(users);
  }
  const contextValues = {
    chat: chat,
    user:user,
    online:online,
    setChat: setChat,
    setUser:setUser,
    setOnline:setOnline,
  };
  return (
    <Context.Provider value={contextValues}>{props.children}</Context.Provider>
  );
}
export default Context;
