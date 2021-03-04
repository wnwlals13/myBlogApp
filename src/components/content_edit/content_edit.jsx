import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../utils/navbar/navbar";
import styles from "./content_edit.module.css";

const ContentEdit = ({ contents, FileInput, reviseContent }) => {
  const titleRef = useRef();
  const contentRef = useRef();
  const [updateFile, setUpdateFile] = useState({
    fileName: null,
    fileURL: null,
  });
  const history = useHistory();
  const {
    fileName,
    fileURL,
    id,
    mainContents,
    title,
    updateDate,
    uploadDate,
    userId,
  } = history?.location?.state?.article;

  const onUpload = (event) => {
    event.preventDefault();
    const update = {
      id: id,
      uploadDate: uploadDate,
      updateDate: getFormatDate(new Date()) || "",
      userId: userId,
      title: titleRef.current.value,
      mainContents: contentRef.current.value,
      fileName: fileName,
      fileURL: fileURL,
    };
    reviseContent({
      ...update,
    });
  };
  const onKeyUp = (event) => {
    event.preventDefault();
    reviseContent({
      ...contents,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  const onFileChange = (file) => {
    file && setUpdateFile({ fileName: file.name, fileURL: file.url });
  };
  useEffect(() => {
    reviseContent({ ...contents, updateFile });
  }, [, updateFile]);
  const getFormatDate = (date) => {
    var year = date.getFullYear();
    var month = 1 + date.getMonth();
    month = month >= 10 ? month : "0" + month;
    var day = date.getDate();
    day = day >= 10 ? day : "0" + day;
    return year + "-" + month + "-" + day;
  };
  return (
    <form className={styles.inputContainer}>
      <input
        type="text"
        name="title"
        ref={titleRef}
        defaultValue={title || ""}
        className={`${styles.title} ${styles.data}`}
        placeholder="제목을 입력하세요."
        onKeyUp={onKeyUp}
      />

      <div className={styles.fileInput}>
        <FileInput
          name={updateFile.fileName != "" ? updateFile.fileName : fileName}
          onFileChange={onFileChange}
        />
      </div>
      <textarea
        name="mainContents"
        ref={contentRef}
        defaultValue={mainContents || ""}
        className={`${styles.contents} ${styles.data}`}
        placeholder="내용을 입력하세요."
        onKeyUp={onKeyUp}
      ></textarea>
      {/* <div className={`${styles.hashTag__container} ${styles.data}`}>
        <Hashtag hashtag={hashtag} onTagChange={onTagChange} />
      </div> */}
      <button className={styles.uploadBtn} onClick={onUpload}>
        수정하기
      </button>
    </form>
  );
};

export default ContentEdit;
