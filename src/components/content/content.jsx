import React, { memo } from "react";
import styles from "./content.module.css";

const Content = memo (({ content, getArticle }) => {
  
  const { fileURL, title, user_id, userName } = content;
  
  const onClickHandle = () => {
    getArticle(content);
  };

  const handleNoImg = (e) => {
    e.currentTarget.style = 'display:none;'
  }

  return (
    <article className={styles.contentContainer} onClick={onClickHandle}>
        <div className={styles.imgInfo}>
          <img src={fileURL} className={styles.imgFile} onError={handleNoImg}></img>
        </div>
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
