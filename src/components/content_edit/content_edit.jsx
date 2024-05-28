import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../utils/navbar/navbar";
import Editor from "../editor/editor";
import styles from "./content_edit.module.css";

const ContentEdit = ({ contents, authService, dbService, FileInput }) => {
  const titleRef = useRef();
  // const [mainText, setMainText] = useState("");
  const [updateFile, setUpdateFile] = useState({
    fileName: null,
    fileURL: null,
  });
  console.log(contents);
  const history = useNavigate();
  const {
    fileName,
    fileURL,
    id,
    mainContents,
    title,
    uploadDate,
    userId,
    name,
    email,
  } = history?.location?.state?.article;
  const goToMain = () => {
    history.push({
      pathname: "/",
      state: {
        id: id || null,
        name: name || null,
        email: email || null,
        // contentId: contents.id ? contents.id : null,
      },
    });
  };
  const reviseContent = (update) => {
    // setContents(update);
    dbService.updateContent(update.userId, update);
    goToMain();
  };

  const onUpload = (event) => {
    event.preventDefault();
    const update = {
      id: id,
      uploadDate: uploadDate,
      updateDate: getFormatDate(new Date()) || "",
      userId: userId,
      title: titleRef.current.value,
      mainContents: "",
      fileName: fileName,
      fileURL: fileURL,
    };
    reviseContent({
      ...update,
    });
  };
  const onKeyUp = (event) => {
    event.preventDefault();
    // reviseContent({
    //   ...contents,
    //   [event.currentTarget.name]: event.currentTarget.value,
    // });
  };
  const onFileChange = (file) => {
    file && setUpdateFile({ fileName: file.name, fileURL: file.url });
  };
  const onChangeField = (data) => {
    // data && setMainText(data.content);
    console.log(data.content);
  };
  useEffect(() => {
    // reviseContent({ ...contents, updateFile });
    console.log();
  }, [updateFile]);
  const getFormatDate = (date) => {
    var year = date.getFullYear();
    var month = 1 + date.getMonth();
    month = month >= 10 ? month : "0" + month;
    var day = date.getDate();
    day = day >= 10 ? day : "0" + day;
    return year + "-" + month + "-" + day;
  };

  return (
    <div className={styles.editContainer}>
      <Navbar authService={authService} dbService={dbService} />
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
            name={updateFile.fileName !== null ? updateFile.fileName : fileName}
            onFileChange={onFileChange}
          />
        </div>
        <div className={styles.mainContents}>
          <Editor mainContents={mainContents} onChangeField={onChangeField} />
        </div>
        {/* <div className={`${styles.hashTag__container} ${styles.data}`}>
        <Hashtag hashtag={hashtag} onTagChange={onTagChange} />
      </div> */}
        <button className={styles.uploadBtn} onClick={onUpload}>
          수정하기
        </button>
      </form>
    </div>
  );
};
export default ContentEdit;
