import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../utils/navbar/navbar.jsx";
import styles from "./loginModal.module.css";
import mainImg from "../../common/images/loginImg.png";
import googleImg from "../../common/images/google.png";
import gitImg from "../../common/images/github.png";

const LoginModal = ({ authService }) => {
  const history = useNavigate();
  const onLogIn = useCallback(
    (userId, userName, userEmail) => {
      history.push({
        pathname: "/",
        state: { id: userId, name: userName, email: userEmail },
      });
    },
    [history]
  );
  const onClick = (event) => {
    authService
      .login(event.currentTarget.id)
      .then((data) => onLogIn(data.user.uid));
  };
  useEffect(() => {
    authService.onAuthChange((user) => {
      user && onLogIn(user.uid, user.displayName, user.email);
    });
  }, [authService, onLogIn]);
  return (
    <section className={styles.container}>
      <section className={styles.navContainer}>
        <Navbar authService={authService} />
      </section>
      <section className={styles.loginContainer}>
        <div className={styles.loginHeader}>
          <img src={mainImg} alt="loginimg" className={styles.loginImg} />
        </div>
        <div className={styles.loginBody}>
          <p className={styles.signin}>Login</p>
          <div className={styles.loginSocial}>
            <button id="Google" onClick={onClick} className={styles.button}>
              <img src={googleImg} alt="google" className={styles.socialImg} />
            </button>
            <button id="Github" onClick={onClick} className={styles.button}>
              <img className={styles.socialImg} src={gitImg} alt="github" />
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default LoginModal;
