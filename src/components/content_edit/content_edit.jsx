import React from "react";
import Navbar from "../../utils/navbar/navbar";
import styles from "./content_edit.module.css";

const ContentEdit = (authService, FileInput) => {
  return (
    <form className={styles.inputContainer}>
      <input
        type="text"
        name="title"
        // ref={titleRef}
        // value={title}
        className={`${styles.title} ${styles.data}`}
        placeholder="제목을 입력하세요."
        // onKeyUp={onKeyUp}
      />

      <div className={styles.fileInput}>
        {/* <FileInput name={updateFile.fileName} onFileChange={onFileChange} /> */}
      </div>
      <textarea
        name="mainContents"
        // ref={mainContentRef}
        // value={mainContent}
        className={`${styles.contents} ${styles.data}`}
        placeholder="내용을 입력하세요."
        // onKeyUp={onKeyUp}
      ></textarea>
      {/* <div className={`${styles.hashTag__container} ${styles.data}`}>
        <Hashtag hashtag={hashtag} onTagChange={onTagChange} />
      </div> */}
      {/* <button className={styles.uploadBtn} onClick={onUpload}>
        업로드
      </button> */}
    </form>
  );
};

export default ContentEdit;
