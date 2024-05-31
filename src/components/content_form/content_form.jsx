import React, { memo, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./content_form.module.css";
import Hashtag from "../hashtag/hashtag";
import Editor from "../editor/editor";

const ContentForm = memo(
  ({ contents, addContent, updateContent, FileInput }) => {
    const titleRef = useRef();
    const [hashtag, setHashtag] = useState([]);
    const [mainText, setMainText] = useState("");
    const [updateFile, setUpdateFile] = useState({
      fileName: null,
      fileURL: null,
    });
    const history = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('user'));

    const onUpload = (event) => {
      event.preventDefault();
      if (titleRef.current.value === "") {
        alert("제목을 입력해주세요.");
        return;
      } else if (mainText == undefined) {
        alert("내용을 입력해주세요");
      }
      const content = {
        id: Date.now().toString(),
        createDate: getFormatDate(new Date()) || "",
        updateDate: getFormatDate(new Date()) || "",
        userName: userInfo?.name,
        userId: userInfo?.email,
        title: titleRef.current.value,
        mainContents: mainText || "",
        fileName: updateFile.fileName || "",
        fileURL: updateFile.fileURL || "",
        // hashtag: hashtag,
      };
      
      addContent({ ...content });
    };
    //✨hashtag 하고싶다
    const onKeyUp = (e) => {
      e.preventDefault();
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

    const hashTagHandle = (data) => {
      setHashtag(data);
    };
    const onChangeField = (data) => {
      data && setMainText(data.content);
    };
    useEffect(() => {
      updateContent({
        ...contents,
        ["mainContents"]: mainText,
        updateFile,
      });
    }, [updateFile, mainText]);

    const getFormatDate = (date) => {
      var year = date.getFullYear();
      var month = 1 + date.getMonth();
      month = month >= 10 ? month : "0" + month;
      var day = date.getDate();
      day = day >= 10 ? day : "0" + day;
      return year + "-" + month + "-" + day;
    };
    return (
      <section className={styles.inputContainer}>
        <input
          type="text"
          name="title"
          ref={titleRef}
          className={`${styles.title} ${styles.data}`}
          placeholder="제목을 입력하세요."
          onKeyUp={onKeyUp}
          autoFocus="True"
        />
        <div className={styles.fileInput}>
          <FileInput name={updateFile.fileName} onFileChange={onFileChange} />
        </div>

        <div className={styles.mainContents}>
          <Editor mainContents={mainText} onChangeField={onChangeField} />
        </div>
        <button className={styles.uploadBtn} onClick={onUpload}>
          업로드
        </button>
      </section>
    );
  }
);

export default ContentForm;
