import React from "react";
import styles from "../page.module.css";

const GridLayout = ({ children }) => {
  return <div className={styles.gridLayout}>{children}</div>;
};

export default GridLayout;
