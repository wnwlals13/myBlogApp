import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../utils/footer/footer.jsx";
import Navbar from "../../utils/navbar/navbar.jsx";
import Content from "../content/content.jsx";
import styles from "./contentsList.module.css";

const ContentsList = ({ authService, dbService }) => {
  const navigate = useNavigate();
  const historyId = navigate?.location?.state;
  const [contentList, setContentList] = useState([]);

  const getContent = async () => {
    const result = await dbService.getAllContent();
    setContentList(result);
  }

  useEffect(() => {
    getContent();
  }, [dbService]);

  const oneArticle = (result) => {
    navigate("/viewPost", {
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
      <div className={styles.contentsContainer}>
        {Object.values(contentList).map((item,index) => (
          <Content
            key={index}
            content={item}
            getArticle={oneArticle}
          />
        ))}
      </div>
    </section>
  );
};

export default ContentsList;
