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
  const onHandleAddPost = () => {
    history.push({
      pathname: "/addPost",
      state: {
        id: historyId ? historyId.id : null,
        name: historyId ? historyId.name : null,
      },
    });
  };
  return (
    <ul
      className={`${styles.myModalList} ${display ? styles.show : undefined}`}
    >
      <li className={styles.listItem} onClick={onHandleAddPost}>
        새 글 쓰기
      </li>
      <li className={styles.listItem}>내가 쓴 글</li>
      <li className={styles.listItem} onClick={onthirdClick}>
        로그아웃
      </li>
    </ul>
  );
});

export default MyModal;
