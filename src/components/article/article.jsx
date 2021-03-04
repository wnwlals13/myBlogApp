import React, { memo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../utils/navbar/navbar";
import styles from "./article.module.css";

const Article = memo(({ authService, dbService }) => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const history = useHistory();
  const historyId = history?.location?.state?.article;

  const { userName, title, mainContents, fileURL, uploadDate } = historyId;

  const goTo = () => {
    history.push({
      pathname: "/",
      state: {
        id: history?.location?.state.id,
        name: history?.location?.state.name,
        email: history?.location?.state.email,
        article: null,
      },
    });
  };
  // const onUpdateHandle = () => {
  //   goTo("/addPost");
  // };
  const onDeleteHandle = () => {
    dbService.removeContent(currentUser, historyId.id);
    goTo("/");
  };
  useEffect(() => {
    authService.onAuthChange((user) => {
      const email = user && user.email.split("@")[0];
      user && setCurrentEmail(email);
      user && setCurrentUser(user.uid);
    });
  }, [authService]);
  useEffect(() => {
    return () => setCurrentUser("");
  }, []);
  useEffect(() => {
    return () => setCurrentEmail("");
  }, []);
  return (
    <section className={styles.container}>
      <Navbar authService={authService} />

      <div className={styles.articleContainer}>
        <button className={styles.backBtn} onClick={goTo}>
          홈으로
        </button>

        <div className={styles.title}>{title}</div>
        <div className={styles.info}>
          <div className={styles.info__Text}>
            <div className={styles.userInfo}>{userName}</div>
            <div className={styles.date}>{uploadDate}</div>
          </div>
          {historyId.userName === currentEmail && (
            <div className={styles.info__mybtns}>
              {/* <button className={styles.update} onClick={onUpdateHandle}>
                수정하기
              </button> */}
              <button className={styles.delete} onClick={onDeleteHandle}>
                삭제하기
              </button>
            </div>
          )}
        </div>
        {fileURL && <img className={styles.file} src={fileURL} alt="img" />}
        <div className={styles.content}>{mainContents}</div>
      </div>
    </section>
  );
});

export default Article;
