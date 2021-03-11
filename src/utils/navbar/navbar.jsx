import React, { memo, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import MyModal from "../../components/myModal/myModal";
import Sidebar from "../sidebar/sidebar";
import styles from "./navbar.module.css";

const Navbar = memo(({ authService, dbService }) => {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [display, setDisplay] = useState(false); //✨modal띄우기 display state를 설정해서 해결!
  const [menu, setMenu] = useState([]);
  const history = useHistory();
  const sidebarRef = useRef();

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
  const slideSidebar = () => {
    sidebarRef.current.className = `${styles.sideSection} ${styles.show}`;
    // console.log(sidebarRef.current.className);
  };
  const hideSidebar = (e) => {
    console.log(e.target);
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      user && setName(user.displayName);
      user && setEmail(user.email);
      user && setUserId(user.uid);
    });
    dbService.readAllContent().then(function (snapshot) {
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          const results = child.val();
          Object.keys(results).forEach((item) => {
            results[item].hashtag.map((each) => {
              setMenu((menu) => {
                const update = [...menu, each];
                return update;
              });
            });
          });
        });
      }
    });
  }, [authService, dbService]);
  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={goToHome}>
        <div
          ref={sidebarRef}
          className={styles.sidebarContainer}
          onClick={hideSidebar}
        >
          <div className={styles.sidebarInner}>
            <Sidebar menu={menu} />
          </div>
        </div>
        <p className={styles.sidebar} onClick={slideSidebar}>
          🙆‍♀️
        </p>{" "}
        지극히 주관적인 블로그
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
