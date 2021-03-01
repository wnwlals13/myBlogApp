import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../utils/navbar/navbar";
import ContentForm from "../content_form/content_form";
import ContentPreview from "../content_preview/content_preview";
import styles from "./content_add.module.css";

const ContentAdd = ({ authService, dbService, FileInput }) => {
  const [contents, setContents] = useState([]);
  const [require, setRequire] = useState(false);

  const history = useHistory();
  const historyId = history?.location?.state;
  const addContent = (content) => {
    setContents((contents) => {
      let update = { ...contents };
      if (content.title !== undefined || content.mainContetns !== undefined) {
        setRequire(true);
      }
      update = content;
      return update;
    });
  };

  const onuploadHandle = () => {
    if (require == false) {
      alert("내용을 모두 작성해주세요");
      return;
    }
    uploading();
  };
  const uploading = () => {
    require && dbService.saveContent(historyId.id, contents);
    history.push({
      pathname: "/",
      state: {
        id: historyId ? historyId.id : null,
        name: historyId ? historyId.name : null,
      },
    });
  };
  return (
    <section className={styles.container}>
      <Navbar authService={authService} />

      <div className={styles.addContainer}>
        <div className={styles.inputWrap}>
          <ContentForm
            contents={contents}
            addContent={addContent}
            FileInput={FileInput}
          />
        </div>
        <div className={styles.prevWrap}>
          <ContentPreview contents={contents} />
        </div>
      </div>
      <button className={styles.uploadBtn} onClick={onuploadHandle}>
        업로드
      </button>
    </section>
  );
};

export default ContentAdd;
