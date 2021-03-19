import React, { memo, useEffect } from "react";
import styles from "./content_preview.module.css";

const ContentPreview = memo(({ contents }) => {
  const { title, mainContents, updateFile, fileURL } = contents;
  const url = updateFile?.fileURL || fileURL;
  return (
    <section className={styles.prevContainer}>
      <div className={styles.prev__Title}>{title}</div>

      {url && <img src={url} alt="preview" className={styles.imgTag} />}

      <div dangerouslySetInnerHTML={{ __html: mainContents }}></div>
    </section>
  );
});

export default ContentPreview;
