import React, { useRef, useState } from "react";
import { FaCamera, FaImage } from "react-icons/fa";
import { SlClose } from "react-icons/sl";
import styles from "./create.module.css";
import usePost from "../logic/usePost";
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
  const { post } = usePost(posting);
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
        <button
          className={styles.button}
          onClick={() =>
            post(descriptionRef, setIsLoading, image, setPosting, setPreview)
          }
        >
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
