import React from "react";
import Content from "../content/content";
import styles from "./contents.module.css";

const Contents = ({ property, article }) => {
  const oneArticle = (data) => {
    article(data);
  };
  return (
    <div className={styles.subContainer}>
      {Object.keys(property).map((key) => (
        <Content key={key} content={property[key]} getArticle={oneArticle} />
      ))}
    </div>
  );
};

export default Contents;
