import React from "react";
import styles from "../page.module.css";

const MainContainer = ({ children }) => {
  return <div className={styles.mainContainer}>{children}</div>;
};

export default MainContainer;
