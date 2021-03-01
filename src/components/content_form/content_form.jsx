import React, { useEffect, useRef, useState } from "react";
import Hashtag from "../hashtag/hashtag";
import styles from "./content_form.module.css";

const ContentForm = ({ contents, addContent, FileInput }) => {
  const titleRef = useRef();
  const mainContentRef = useRef();

  const [hashtag, setHashtag] = useState([]);
  const [updateFile, setUpdateFile] = useState({
    fileName: null,
    fileURL: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const onChange = (e) => {
    if (e.currentTarget == null) {
      return;
    }
    e.preventDefault();
    addContent({
      ...contents,
      [e.currentTarget.name]: e.currentTarget.value,
      hashtag,
      updateFile,
    });
  };

  const onFileChange = (file) => {
    file && setUpdateFile({ fileName: file.name, fileURL: file.url });
  };

  useEffect(() => {
    addContent({
      ...contents,
      updateFile,
    });
  }, [updateFile]);
  const onTagChange = () => {};
  return (
    <form className={styles.inputContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        ref={titleRef}
        // value={title}
        className={`${styles.title} ${styles.data}`}
        placeholder="제목을 입력하세요."
        onKeyUp={onChange}
      />

      <div className={styles.fileInput}>
        <FileInput name={updateFile.fileName} onFileChange={onFileChange} />
      </div>
      <textarea
        name="mainContents"
        ref={mainContentRef}
        // value={mainContent}
        className={`${styles.contents} ${styles.data}`}
        placeholder="내용을 입력하세요."
        onKeyUp={onChange}
      ></textarea>
      <div className={`${styles.hashTag__container} ${styles.data}`}>
        <Hashtag hashtag={hashtag} onTagChange={onTagChange} />
      </div>
    </form>
  );
};

export default ContentForm;
