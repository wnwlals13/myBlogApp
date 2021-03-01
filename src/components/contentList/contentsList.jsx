import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Database from "../../service/database.js";
import Navbar from "../../utils/navbar/navbar.jsx";
import MyModal from "../myModal/myModal.jsx";
import styles from "./contentsList.module.css";

const ContentsList = ({ authService, dbService }) => {
  const history = useHistory();

  const showLoginModal = () => {
    history.push("/login");
  };
  // const onLogout = () => {
  //   authService.logout();
  // };
  // const showMyModal = () => {
  //   setDisplay(true);
  // };

  // showLoginModal={showLoginModal}
  useEffect(() => {
    const result = dbService.readContent(history.location.state.id);
    result.then(console.log);
  }, []);
  return (
    <section>
      <Navbar authService={authService} />
      <section>dsds</section>
    </section>
  );
};

export default ContentsList;
