import React from "react";
import styles from "../page.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <div className={styles.companyName}>ArtIVerse Studio</div>
      </Link>
      <div className={styles.menu}>
        <p>Discord</p>
        <p>Connect</p>
        <p>Newsletter</p>
      </div>
    </div>
  );
};

export default Header;
