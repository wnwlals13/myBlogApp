import React, { useEffect, useRef, useState } from "react";
import styles from "./hashtag.module.css";

const Hashtag = ({ setHashtag }) => {
  const [hash, setHash] = useState([]);
  const hashOneRef = useRef();
  const hashRef = useRef();

  const onKeyUp = (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      if (hash.length >= 2) {
        event.target.className = `${styles.hashTag} ${styles.error}`;
        hashRef.current.value = "2개 이상 태그를 입력할 수 없습니다.";
        setTimeout(() => {
          hashRef.current.value = "";
        }, 1000);
        return; //hashtag 제한 2개
      }
      setHash([...hash, hashRef.current.value]);
      hashRef.current.value = "";
    }
  };
  useEffect(() => {
    setHashtag(hash);
  }, [hash]);
  const onClickEachHash = (event) => {
    hash.forEach((data) => {
      if (data.match(event.currentTarget.innerText)) {
        removeEachHash(data);
      }
    });
  };
  const removeEachHash = (data) => {
    const temp = [...hash];
    const index = temp.indexOf(data);
    temp.splice(index, 1);
    setHash(temp);
  };
  return (
    <>
      <input
        type="text"
        className={styles.hashTag}
        ref={hashRef}
        onKeyUp={onKeyUp}
        placeholder="#Enter tag "
      />
      <ul ref={hashOneRef} className={styles.hashTag__made}>
        {hash.map((tag) => {
          return (
            <li
              key={tag}
              className={styles.hashTag__one}
              onClick={onClickEachHash}
            >
              {tag}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Hashtag;
