import React, { memo, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
// import Hashtag from "../hashtag/hashtag";
import styles from "./content_form.module.css";

const ContentForm = memo(
  ({ contents, addContent, updateContent, FileInput }) => {
    const titleRef = useRef();
    const mainContentRef = useRef();
    // const [hashtag, setHashtag] = useState([]);
    const [updateFile, setUpdateFile] = useState({
      fileName: null,
      fileURL: null,
    });
    const history = useHistory();
    const historyId = history?.location?.state?.email;
    const userid = historyId ? historyId.split("@") : null;
    // console.log(history.location.state.id);
    const onUpload = (event) => {
      event.preventDefault();
      const content = {
        id: Date.now(),
        uploadDate: getFormatDate(new Date()) || "",
        updateDate: getFormatDate(new Date()) || "",
        userName: userid[0] || "",
        userId: history?.location?.state?.id || "",
        title: titleRef.current.value || "",
        mainContents: mainContentRef.current.value || "",
        fileName: updateFile.fileName || "",
        fileURL: updateFile.fileURL || "",
      };
      addContent({ ...content });
    };
    //✨hashtag 하고싶다
    const onKeyUp = (e) => {
      e.preventDefault();
      if (e.keycode === 13) {
        console.log(e);
        return;
      }
      updateContent({
        ...contents,
        [e.currentTarget.name]: e.currentTarget.value,
        // hashtag,
        updateFile,
      });
    };

    const onFileChange = (file) => {
      file && setUpdateFile({ fileName: file.name, fileURL: file.url });
    };

    useEffect(() => {
      updateContent({
        ...contents,
        updateFile,
      });
    }, [updateFile, contents, updateContent]);

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
          className={`${styles.title} ${styles.data}`}
          placeholder="제목을 입력하세요."
          onKeyUp={onKeyUp}
        />

        <div className={styles.fileInput}>
          <FileInput name={updateFile.fileName} onFileChange={onFileChange} />
        </div>
        <textarea
          name="mainContents"
          ref={mainContentRef}
          className={`${styles.contents} ${styles.data}`}
          placeholder="내용을 입력하세요."
          onKeyUp={onKeyUp}
        ></textarea>
        {/* <div className={`${styles.hashTag__container} ${styles.data}`}>
          <Hashtag hashtag={hashtag} />
        </div> */}
        <button className={styles.uploadBtn} onClick={onUpload}>
          업로드
        </button>
      </form>
    );
  }
);

export default ContentForm;
