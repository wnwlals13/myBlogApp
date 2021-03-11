import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../utils/navbar/navbar";
import ContentEdit from "../content_edit/content_edit";
import ContentForm from "../content_form/content_form";
import ContentPreview from "../content_preview/content_preview";
import styles from "./content_add.module.css";

const ContentAdd = ({ authService, dbService, FileInput }) => {
  const [contents, setContents] = useState([]);
  // const [require, setRequire] = useState(false);

  const history = useHistory();
  const historyId = history?.location?.state;
  const historyArticle = history?.location?.state?.article;
  const goToMain = () => {
    history.push({
      pathname: "/",
      state: {
        id: historyId ? historyId.id : null,
        name: historyId ? historyId.name : null,
        email: historyId ? historyId.email : null,
        // contentId: contents.id ? contents.id : null,
      },
    });
  };
  const addContent = (content) => {
    setContents((contents) => {
      let update = { ...contents };
      update[content.id] = content;
      return update;
    });
    dbService.saveContent(historyId.id, content);
    goToMain();
  };
  const updateContent = (content) => {
    setContents(content);
  };
  const reviseContent = (update) => {
    setContents(update);
    dbService.updateContent(update.userId, update);
    goToMain();
  };

  useEffect(() => {
    setContents(historyArticle);
  }, [historyArticle]);

  return (
    <section className={styles.container}>
      <Navbar authService={authService} />

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
          {historyArticle && (
            <ContentEdit
              contents={contents}
              FileInput={FileInput}
              reviseContent={reviseContent}
            />
          )}
        </div>

        <div className={styles.prevWrap}>
          {contents && <ContentPreview contents={contents} />}
        </div>
      </div>
    </section>
  );
};

export default ContentAdd;
