import React, { memo } from "react";
import styles from "./content.module.css";

const Content = memo(({ content, getArticle }) => {
  const { userName, title, fileURL } = content;
  const onClickHandle = () => {
    getArticle(content);
  };
  return (
    <article className={styles.contentContainer} onClick={onClickHandle}>
      {fileURL && (
        <div className={styles.imgInfo}>
          <img src={fileURL} className={styles.imgFile} alt="imgFile"></img>
        </div>
      )}
      <div className={styles.metadata}>
        <p className={styles.title}>{title}</p>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.id}>by {userName}</div>
      </div>
    </article>
  );
});

export default Content;
