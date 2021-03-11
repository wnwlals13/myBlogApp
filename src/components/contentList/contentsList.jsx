import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../../utils/footer/footer.jsx";
import Navbar from "../../utils/navbar/navbar.jsx";
import Content from "../content/content.jsx";
import styles from "./contentsList.module.css";

const ContentsList = ({ authService, dbService }) => {
  const history = useHistory();
  const historyId = history?.location?.state;
  const [contentList, setContentList] = useState([]);
  const [article, setArticle] = useState({});

  useEffect(() => {
    try {
      dbService.readAllContent().then(function (snapshot) {
        if (snapshot.exists()) {
          snapshot.forEach((child) => {
            const results = child.val();
            Object.keys(results).forEach((item) => {
              setContentList((contentList) => {
                const update = { ...contentList };
                update[item] = results[item];
                return update;
              });
            });
          });
        } else {
          setContentList([]);
        }
      });
    } catch (e) {
      return e;
    }
  }, [dbService]);
  // useEffect(() => {
  //   return () => setContentList([]);
  // }, []);
  // useEffect(() => {
  //   console.log(article);
  //   getArticle(article);
  // }, [article]);
  const oneArticle = (result) => {
    history.push({
      pathname: "/viewPost",
      state: {
        id: historyId ? historyId.id : null,
        name: historyId ? historyId.name : null,
        email: historyId ? historyId.email : null,
        article: result,
      },
    });
  };
  return (
    <section className={styles.container}>
      <Navbar authService={authService} />
      <div className={styles.contentsContainer}>
        {Object.keys(contentList).map((key) => (
          <Content
            key={key}
            content={contentList[key]}
            getArticle={oneArticle}
          />
        ))}
      </div>
      <Footer />
    </section>
  );
};

export default ContentsList;
