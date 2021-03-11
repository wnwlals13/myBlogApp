import React from "react";
import styles from "./sidebar.module.css";

const Sidebar = ({ menu }) => (
  <ul className={styles.sidebarWrapper}>
    <h3>HashTags</h3>
    {menu.map((item) => (
      <li key={item} className={styles.sideLI}>
        {item}
      </li>
    ))}
  </ul>
);

export default Sidebar;
