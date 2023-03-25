import PageContainer from "./page/pageContainer";
import Posts from "./component/posts";
import Search from "./component/search";
import Create from "./component/create";
import Chats from "./component/chats";
import Chat from "./component/chat";
import Comments from "./component/comments";
import Sign from "./page/sign";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import EditProfile from "./component/editProfile";
import Error from "./page/error";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Sign />} />
      {localStorage.getItem("user") !== null && (
        <>
          <Route
            path="/posts"
            element={
              <PageContainer>
                <Posts />
              </PageContainer>
            }
          />
          <Route
            path="/posts/comments/:id"
            element={
              <PageContainer>
                <Comments />
              </PageContainer>
            }
          />
          <Route
            path="/search"
            element={
              <PageContainer>
                <Search />
              </PageContainer>
            }
          />
          <Route
            path="/create"
            element={
              <PageContainer>
                <Create />
              </PageContainer>
            }
          />
          <Route
            path="/chats"
            element={
              <PageContainer>
                <Chats />
              </PageContainer>
            }
          />
          <Route
            path="/chats/:type/:id"
            element={
              <PageContainer>
                <Chat />
              </PageContainer>
            }
          />
          <Route
            path="/profile"
            element={
              <PageContainer>
                <EditProfile />
              </PageContainer>
            }
          />
        </>
      )}
      <Route path="/*" element={<Error />} />
    </Routes>
  );
}

export default App;
