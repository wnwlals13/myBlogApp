import React, { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./myModal.module.css";

const MyModal = memo(({ display, onLogout }) => {
  const navigate = useNavigate();
  const {state} = useLocation();

  const onthirdClick = () => {
    navigate("/");
    display = false;
    onLogout();
  };
  const handleMenu = (event) => {
    const dataId = event.target.dataset.id;
    console.log(state);
    if (dataId === "newly") {
      navigate("/addPost", {
        state: state,
      });
    } else if (dataId === "mypost") {
      navigate( "/", {
        state: state
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
      <li className={styles.listItem} data-id="logout" onClick={onthirdClick}>
        로그아웃
      </li>
    </ul>
  );
});

export default MyModal;
