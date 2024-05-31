import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./loginModal.module.css";
import mainImg from "../../common/images/loginImg.png";
import googleImg from "../../common/images/google.png";
import gitImg from "../../common/images/github.png";

/**
 * 로그인
 */
const LoginModal = ({ authService }) => {
  const navigate = useNavigate();
  const onLogIn = useCallback((userId, userName, userEmail) => {
      navigate('/', {state : {id: userId, name: userName, email: userEmail}})
    },
    [navigate]
  );
  const onClick = (event) => {
    authService.login(event.currentTarget.id);
      // onLogIn(data.user.uid)
  };
  useEffect(() => {
    authService.onAuthChange((user) => {
      console.log(user);
      user && onLogIn(user.uid, user.displayName, user.email);
    });
  }, [authService, onLogIn]);
  return (
    <section className={styles.container}>
      <section className={styles.navContainer}>
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
