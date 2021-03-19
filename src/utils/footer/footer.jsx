import React, { memo } from "react";
import styles from "./footer.module.css";
import gitImg from "../../common/images/github_white.png";

const Footer = memo((props) => {
  const goToGit = () => {
    document.location.href = "https://github.com/wnwlals13";
  };
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footer__text}>
        © 2021, wnwlals13 All rights reserved.
      </div>
      <img
        className={styles.footer__github}
        src={gitImg}
        alt="github"
        onClick={goToGit}
      />
    </footer>
  );
});

export default Footer;
