import React from "react";
import styles from "../page.module.css";
import Link from "next/link";
import Tabs from "../components/Tabs";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <Link href="/">
          <div className={styles.companyName}>ArtIVerse Studio</div>
        </Link>
        <div className={styles.menu}>
          <p>Discord</p>
          <p>Connect</p>
          <p>Newsletter</p>
        </div>
      </div>
      <Tabs />
    </div>
  );
};

export default Header;
