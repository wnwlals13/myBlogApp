import React, { memo } from "react";
import styles from "./footer.module.css";

const Footer = memo((props) => {
  const goToGit = () => {
    document.location.href = "https://github.com/wnwlals13";
  };
  const goToNotion = () => {
    document.location.href =
      "https://www.notion.so/Joo-Jimin-s-Portfolio-04c8bf54cdfa42499e885b261a8ebf0e";
  };
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footer__text}>More about 주인장</div>
      <img
        className={styles.footer__github}
        src="../../image/github_white.png"
        alt="github"
        onClick={goToGit}
      />
      <img
        className={styles.footer__resume}
        src="../../image/notion.png"
        alt="resume"
        onClick={goToNotion}
      />
    </footer>
  );
});

export default Footer;
