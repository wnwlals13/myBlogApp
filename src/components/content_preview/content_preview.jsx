import React, { memo } from "react";
import styles from "./content_preview.module.css";

const ContentPreview = memo(({ contents }) => {
  const { title, mainContents, updateFile } = contents;
  const url = updateFile?.fileURL;

  return (
    <section className={styles.prevContainer}>
      <div className={styles.prev__Title}>{title}</div>
      {url && (
        <img
          src={process.env.PUBLIC_URL + url}
          alt="photo"
          className={styles.imgTag}
        />
      )}
      <p className={styles.prev__Content}>{mainContents}</p>
    </section>
  );
});

export default ContentPreview;
