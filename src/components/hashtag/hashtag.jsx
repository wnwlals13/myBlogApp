import React, { useRef } from "react";
import styles from "./hashtag.module.css";

const Hashtag = ({ hashtag, onTagChange }) => {
  const hashOneRef = useRef();
  const hashRef = useRef();

  const onKeyUp = (event) => {
    event.preventDefault();
    if (
      event.key == "Enter" &&
      event.currentTarget.value.length > 0 &&
      hashtag.length < 3
    ) {
      let update = event.currentTarget.value;
      //   setHashtag([...hashtag, update]);
      onTagChange([update]);
      hashRef.current.value = "";
    }
  };
  const onClickEachHash = (event) => {
    hashtag.forEach((data) => {
      if (data.match(event.currentTarget.innerText)) {
        removeEachHash(data);
      }
    });
  };
  const removeEachHash = (data) => {
    const index = hashtag.indexOf(data);
    const update = hashtag.splice(index, 0);
    // setHashtag(update);
    onTagChange([update]);
  };
  return (
    <>
      <input
        type="text"
        className={`${styles.hashTag}  ${styles.data}`}
        ref={hashRef}
        onKeyUpCapture={onKeyUp}
        placeholder="#hashtag"
      />
      <ul ref={hashOneRef} className={styles.hashTag__made}>
        {hashtag.map((hash) => {
          return (
            <li
              key={hash}
              className={styles.hashTag__one}
              onClick={onClickEachHash}
            >
              {hash}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Hashtag;
