import React, { memo } from "react";
import { useHistory } from "react-router-dom";
import styles from "./myModal.module.css";

const MyModal = memo(({ display, onLogout }) => {
  const history = useHistory();
  const historyId = history?.location?.state;
  // console.log(historyId);
  const onthirdClick = () => {
    history.push("/");
    display = false;
    onLogout();
  };
  const handleMenu = (event) => {
    const dataId = event.target.dataset.id;
    if (dataId == "newly") {
      history.push({
        pathname: "/addPost",
        state: {
          id: historyId ? historyId.id : null,
          name: historyId ? historyId.name : null,
          email: historyId ? historyId.email : null,
        },
      });
    } else if (dataId == "mypost") {
      history.push({
        pathname: "/",
        state: {
          id: historyId ? historyId.id : null,
          name: historyId ? historyId.name : null,
          email: historyId ? historyId.email : null,
        },
      });
    }
  };

  return (
    <ul
      className={`${styles.myModalList} ${display ? styles.show : undefined}`}
    >
      <li className={styles.listItem} data-id="newly" onClick={handleMenu}>
        새 글 쓰기
      </li>
      {/* <li className={styles.listItem} data-id="mypost" onClick={handleMenu}>
        내가 쓴 글
      </li> */}
      <li className={styles.listItem} data-id="logout" onClick={onthirdClick}>
        로그아웃
      </li>
    </ul>
  );
});

export default MyModal;
