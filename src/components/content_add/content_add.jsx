import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../utils/navbar/navbar";
import ContentForm from "../content_form/content_form";
import ContentPreview from "../content_preview/content_preview";
import styles from "./content_add.module.css";

const ContentAdd = memo(({ authService, dbService, FileInput }) => {
  const [contents, setContents] = useState([]);

  const history = useNavigate();
  const historyId = history?.location?.state;
  const historyArticle = history?.location?.state?.article;
  const goToMain = () => {
    history("/", {
      state: {
        id: historyId ? historyId.id : null,
        name: historyId ? historyId.name : null,
        email: historyId ? historyId.email : null,
      },
    });
  };
  const addContent = (content) => {
    setContents((contents) => {
      let update = { ...contents };
      update[content.id] = content;
      return update;
    });
    console.log(content);
    dbService.addContent(content);
    goToMain();
  };
  const updateContent = (content) => {
    setContents(content);
  };

  useEffect(() => {
    setContents(historyArticle);
  }, [historyArticle]);

  return (
    <section className={styles.container}>
      <div className={styles.addContainer}>
        <div className={styles.inputWrap}>
          {!historyArticle && (
            <ContentForm
              contents={contents}
              addContent={addContent}
              updateContent={updateContent}
              FileInput={FileInput}
            />
          )}
        </div>
        <div className={styles.prevWrap}>
          {contents && <ContentPreview contents={contents} />}
        </div>
      </div>
    </section>
  );
});

export default ContentAdd;
