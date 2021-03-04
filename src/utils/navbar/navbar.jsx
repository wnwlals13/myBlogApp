import React, { memo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MyModal from "../../components/myModal/myModal";
import styles from "./navbar.module.css";

const Navbar = memo(({ authService }) => {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [display, setDisplay] = useState(false); //✨modal띄우기 display state를 설정해서 해결!
  const history = useHistory();

  const onBtnClick = () => {
    setDisplay(true);
  };
  const onLogout = () => {
    authService.logout();
    setName(null);
    setDisplay(false);
  };

  const onMouseMove = () => {
    setDisplay(true);
  };
  const onMouseLeave = () => {
    setDisplay(false);
  };

  const goToHome = () => {
    history.push({
      pathname: "/",
      state: {
        id: userId || null,
        name: name || null,
        email: email || null,
      },
    });
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      user && setName(user.displayName);
      user && setEmail(user.email);
      user && setUserId(user.uid);
    });
  }, [authService]);
  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={goToHome}>
        지극히 주관적인 블로그 🙆‍♀️
      </div>
      <div className={styles.search}>
        {/* <input type="text" className={styles.searchInput} />
        <img
          src="../image/search.png"
          alt="search"
          className={styles.searchIcon}
        ></img> */}
        {name && (
          <div className={styles.user} onClick={onBtnClick}>
            {name}
          </div>
        )}
        {!name && (
          <div className={styles.user} onClick={() => history.push("/login")}>
            로그인
          </div>
        )}
      </div>
      <section
        className={`${styles.container} ${display ? styles.show : undefined}`}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <MyModal onLogout={onLogout} />
      </section>
    </header>
  );
});

export default Navbar;
