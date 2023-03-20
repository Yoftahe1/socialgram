import React, { useContext, useEffect, useRef, useState } from "react";
import { FaCamera, FaImage } from "react-icons/fa";
import { SlClose } from "react-icons/sl";
import { supabase } from "../supabaseClient";
import Context from "../store/context";
import styles from "./create.module.css";
const Create = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [posting, setPosting] = useState({
    message: "",
    isError: false,
    isSuccess: false,
  });
  const descriptionRef = useRef();
  const fileRef = useRef();
  const ctx = useContext(Context);
  const postingRef = useRef();

  useEffect(() => {
    postingRef.current = posting;
  }, [posting]);
  function addToPost(event) {
    setImage(event.target.files[0]);
    const reader = new FileReader();
    if (event?.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setPreview(readerEvent.target?.result);
    };
  }
  let url;
  async function post() {
    if (descriptionRef.current.value) {
      setIsLoading(true);
      if (image) {
        const date = new Date();
        const { data, error } = await supabase.storage
          .from("posts")
          .upload(`${ctx.user.id}/${date.toISOString()}`, image);
        if (data) {
          getUrl(data.path);
          const { post, error } = await supabase
            .from("posts")
            .insert({
              user_id: ctx.user.id,
              description: descriptionRef.current.value,
              image: url,
            })
            .select();
          if (post) {
            console.log("posted");
          } else {
            console.log(error);
          }
        } else {
          console.log(error);
          setPosting({ message: "Something went wrong", isError: true });
          setTimeout(() => {
            setPosting({ message: "", isError: false, isSuccess: false });
          }, 2000);
        }
      } else {
        const { data, error } = await supabase
          .from("posts")
          .insert({
            user_id: ctx.user.id,
            description: descriptionRef.current.value,
          })
          .select();
        if (data) {
          setPosting({ message: "posted successfully", isSuccess: true });
          setTimeout(() => {
            setPosting({ message: "", isError: false, isSuccess: false });
          }, 2000);
        } else {
          setPosting({ message: error.message, isError: true });
          setTimeout(() => {
            setPosting({ message: "", isError: false, isSuccess: false });
          }, 2000);
          console.log(error);
        }
      }

      setIsLoading(false);
      setPreview(null);
      descriptionRef.current.value = null;
    }
  }
  async function getUrl(path) {
    const { data, error } = supabase.storage.from("posts").getPublicUrl(path);
    if (data) {
      url = data.publicUrl;
    } else {
      console.log(error);
    }
  }
  return (
    <div className={styles.create}>
      {posting.isError && <div className={styles.error}>{posting.message}</div>}
      {posting.isSuccess && (
        <div className={styles.loading}>{posting.message}</div>
      )}
      {isLoading && <div className={styles.loading}>Loading...</div>}

      <h3>What do you want to create?</h3>
      <div className={styles.type}>
        <p className={styles.description}>Create Post</p>
        {preview !== null && (
          <div>
            <div
              className={styles.close}
              onClick={() => {
                setImage(null);
                setPreview(null);
                fileRef.current.value = null;
              }}
            >
              <SlClose />
            </div>
            <img className={styles.image} src={preview} alt="Post" />
          </div>
        )}
        <div className={styles.choice}>
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={addToPost}
            style={{ display: "none" }}
          />
          <div
            onClick={() => {
              fileRef.current?.click();
            }}
          >
            <FaImage />
            Gallery
          </div>
          <div>
            <FaCamera />
            Camera
          </div>
        </div>
        <input
          ref={descriptionRef}
          className={styles.input}
          placeholder="Add description."
        />
        <button className={styles.button} onClick={post}>
          Create
        </button>
      </div>
      <div className={styles.type}>
        <p className={styles.description}>Create Group</p>
        <input className={styles.input} placeholder="Enter group name." />
        <div className={styles.buttons}>
          <button className={styles.button}>Add members</button>
          <button className={styles.button}>Create</button>
        </div>
      </div>
      <div className={styles.type}>
        <p className={styles.description}>Create Channel</p>
        <input className={styles.input} placeholder="Enter channel name." />
        <div className={styles.buttons}>
          <button className={styles.button}>Add members</button>
          <button className={styles.button}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default Create;
