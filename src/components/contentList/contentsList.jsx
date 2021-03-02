import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Database from "../../service/database.js";
import Footer from "../../utils/footer/footer.jsx";
import Navbar from "../../utils/navbar/navbar.jsx";
import Content from "../content/content.jsx";
import Contents from "../contents/contents.jsx";
import MyModal from "../myModal/myModal.jsx";
import styles from "./contentsList.module.css";

const ContentsList = ({ authService, dbService }) => {
  const history = useHistory();
  const historyId = history?.location?.state;
  const [contentList, setContentList] = useState([]);
  const [article, setArticle] = useState(null);
  console.log(
    Object.keys(contentList).map((one) => {
      Object.keys(contentList[one]).map((data) => console.log(data));
    })
  );
  const showLoginModal = () => {
    history.push("/login");
  };
  useEffect(() => {
    dbService.readAllContent().then(function (snapshot) {
      if (snapshot.exists()) {
        let i = 0;
        snapshot.forEach((child) => {
          setContentList((contentList) => {
            const update = { ...contentList };
            update[i] = child.val();
            i += 1;
            return update;
          });
        });
      } else {
        setContentList([]);
      }
    });
    // console.log(contentList);
    // for (let i = 0; i < contentList.length; i++) {
    //   console.log(contentList[i]);
    // }
  }, []);
  // console.log(contentList);
  const getArticle = (result) => {
    setArticle(result);
    history.push({
      pathname: "/viewPost",
      state: {
        id: historyId ? historyId.id : null,
        name: historyId ? historyId.name : null,
        email: historyId ? historyId.email : null,
        article: result ? result : null,
      },
    });
  };
  return (
    <section className={styles.container}>
      <Navbar authService={authService} />
      <div className={styles.contentsContainer}>
        {Object.keys(contentList).map((key) => (
          <Contents
            key={key}
            property={contentList[key]}
            article={getArticle}
          />
        ))}
      </div>
      <Footer />
    </section>
  );
};

export default ContentsList;
