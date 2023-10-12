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
          <div className={styles.connect}>
            <Link href="https://discord.gg/rKV6JBTT">
              <p>Discord</p>
            </Link>
          </div>
          <div className={styles.connect}>
            <p>Connect</p>
          </div>
          <div className={styles.connect}>
            <p>Newsletter</p>
          </div>
        </div>
      </div>
      <Tabs />
    </div>
  );
};

export default Header;
