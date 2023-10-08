import React from "react";
import styles from "../page.module.css";

const RowGallery = ({ children }) => {
  return <div className={styles.rowGallery}>{children}</div>;
};

export default RowGallery;
