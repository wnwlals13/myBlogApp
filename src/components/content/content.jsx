import React, { useState } from "react";
import styles from "./content.module.css";

const Content = ({ content, getArticle }) => {
  //   const [article, setArticle] = useState({});
  const { id, userId, title, mainContent, fileName, fileURL } = content;
  const onClickHandle = () => {
    // setArticle(content);
    getArticle(content);
  };
  return (
    <article className={styles.contentContainer} onClick={onClickHandle}>
      {fileURL && (
        <div className={styles.imgInfo}>
          <img src={fileURL} className={styles.imgFile}></img>
        </div>
      )}
      <div className={styles.metadata}>
        <p className={styles.title}>{title}</p>
        <p className={styles.body}>{mainContent}</p>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.id}>by {userId}</div>
      </div>
    </article>
  );
};

export default Content;
