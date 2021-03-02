import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../utils/navbar/navbar";
import styles from "./article.module.css";

const Article = ({ authService, dbService }) => {
  const [currentEmail, setCurrentEmail] = useState();
  const [currentUser, setCurrentUser] = useState();
  const history = useHistory();
  const historys = history?.location?.state;
  const historyId = history?.location?.state?.article;
  const {
    id,
    userId,
    title,
    mainContent,
    fileName,
    fileURL,
    uploadDate,
  } = historyId;
  const goBack = () => {
    history.push({
      pathname: "/",
      state: {
        id: historys ? historys.id : null,
        name: historys ? historys.name : null,
        email: historys ? historys.email : null,
        article: null,
      },
    });
  };
  const onUpdateHandle = () => {};
  const onDeleteHandle = () => {
    dbService.removeContent(currentUser, historyId.id);
    console.log(currentUser, historyId.id);
    // goBack();
  };
  useEffect(() => {
    authService.onAuthChange((user) => {
      const email = user && user.email.split("@")[0];
      user && setCurrentEmail(email);
      user && setCurrentUser(user.uid);
    });
  }, [historyId]);

  return (
    <section className={styles.container}>
      <Navbar authService={authService} />

      <div className={styles.articleContainer}>
        <button className={styles.backBtn} onClick={goBack}>
          홈으로
        </button>

        <div className={styles.title}>{title}</div>
        <div className={styles.info}>
          <div className={styles.info__Text}>
            <div className={styles.userInfo}>{userId}</div>
            <div className={styles.date}>{uploadDate}</div>
          </div>
          {historyId.userId == currentEmail && (
            <div className={styles.info__mybtns}>
              <button className={styles.update} onClick={onUpdateHandle}>
                수정하기
              </button>
              {/* <button className={styles.delete} onClick={onDeleteHandle}>
                삭제하기
              </button> */}
            </div>
          )}
        </div>
        {fileURL && <img className={styles.file} src={fileURL} alt="img" />}
        <div className={styles.content}>{mainContent}</div>
      </div>
    </section>
  );
};

export default Article;
