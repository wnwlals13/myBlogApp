import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../utils/navbar/navbar.jsx";
import styles from "./loginModal.module.css";

const LoginModal = ({ authService }) => {
  const history = useHistory();
  const onLogIn = (userId, userName) => {
    history.push({
      pathname: "/",
      state: { id: userId, name: userName },
    });
  };
  const onClick = (event) => {
    authService
      .login(event.currentTarget.id)
      .then((data) => onLogIn(data.user.uid));
  };
  useEffect(() => {
    authService.onAuthChange((user) => {
      user && onLogIn(user.uid, user.displayName);
    });
  }, []);
  return (
    <section className={styles.container}>
      <section className={styles.navContainer}>
        <Navbar authService={authService} />
      </section>
      <section className={styles.loginContainer}>
        <div className={styles.loginHeader}>
          <img
            src="../image/loginImg.png"
            alt="loginimg"
            className={styles.loginImg}
          />
        </div>
        <div className={styles.loginBody}>
          <p className={styles.signin}>Login</p>
          <div className={styles.loginSocial}>
            <button id="Google" onClick={onClick} className={styles.button}>
              <img
                src="../image/google.png"
                alt="google"
                className={styles.socialImg}
              />
            </button>
            <button id="Github" onClick={onClick} className={styles.button}>
              <img
                className={styles.socialImg}
                src="../image/github.png"
                alt="github"
              />
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default LoginModal;
