import React, { useContext, useRef, useState } from "react";
import { BsCamera } from "react-icons/bs";
import { MdOutlineBrokenImage } from "react-icons/md";
import { FcLikePlaceholder } from "react-icons/fc";
import Context from "../store/context";
import styles from "./editProfile.module.css";
import Post from "./post";
import useGetYourPost from "../logic/useGetYourPost";
import useGetYourLikes from "../logic/useGetYourLikes";
import useUpdateProfile from "../logic/useUpdateProfile";
const EditProfile = () => {
  const [isPost, setIsPost] = useState(true);
  const posts = useGetYourPost();
  const liked = useGetYourLikes();
  const ctx = useContext(Context);
  const fileRef = useRef();
  const usernameRef = useRef();
  const bioRef = useRef();
  const [posting, setPosting] = useState({
    message: "",
    isError: false,
    isSuccess: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const {update}=useUpdateProfile(posting)

  

  function addToPost(event) {
    setImage(event.target.files[0]);
  }
  return (
    <div className={styles.profile}>
      {posting.isError && <div className={styles.error}>{posting.message}</div>}
      {posting.isSuccess && (
        <div className={styles.loading}>{posting.message}</div>
      )}
      {isLoading && <div className={styles.loading}>Loading...</div>}
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={addToPost}
        style={{ display: "none" }}
      />
      <div className={styles.topBar}>
        <div className={styles.user}>
          <div className={styles.profilePic}>
            <div
              className={styles.changeImg}
              onClick={() => {
                fileRef.current?.click();
              }}
            >
              <BsCamera />
            </div>
            {ctx.user.image ? (
              <img
                src={ctx.user.image}
                className={styles.image}
                alt="profile pic"
              />
            ) : (
              <div className={styles.background}></div>
            )}
          </div>
          <div className={styles.inputAndButton}>
            <div className={styles.usernameAndBio}>
              <input
                className={styles.input}
                ref={usernameRef}
                defaultValue={ctx.user.username}
                placeholder="Enter username"
              />
              <input
                className={styles.input}
                ref={bioRef}
                defaultValue={ctx.user.bio}
                placeholder="Enter your bio"
              />
            </div>
            <button className={styles.button} onClick={()=>update(usernameRef, setIsLoading, image, bioRef, setPosting)}>
              Update
            </button>
          </div>
        </div>
        <div className={styles.PostsAndLiked}>
          <div
            onClick={() => setIsPost(true)}
            className={isPost ? styles.active : undefined}
          >
            <MdOutlineBrokenImage />
            Posts
          </div>
          <div
            onClick={() => setIsPost(false)}
            className={!isPost ? styles.active : undefined}
          >
            <FcLikePlaceholder />
            Liked
          </div>
        </div>
      </div>
      <div className={styles.yourLikeAndPost}>
        {isPost
          ? posts.map((element, index) => {
              return <Post key={index} elements={element} />;
            })
          : liked.map((element, index) => {
              let elements = {
                description: element.description,
                created_at: element.created_at,
                image: element.post_image,
                id: element.post_id,
                comment_count: element.comment_count,
                users: {
                  username: element.username,
                  image: element.user_image,
                },
              };
              return <Post key={index} elements={elements} />;
            })}
      </div>
    </div>
  );
};

export default EditProfile;
