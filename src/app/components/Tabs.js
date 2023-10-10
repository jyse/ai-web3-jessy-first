import React from "react";
import Link from "next/link";
import styles from "../page.module.css";
import { usePathname } from "next/navigation";

const Tabs = () => {
  return (
    <div className={styles.tabs}>
      <div className={styles.tabItem}>
        <Link href="/">
          <h2>Home</h2>
        </Link>
      </div>
      <div className={styles.tabItem}>
        <Link href={{ pathname: "/ai-art", query: { style: "characters" } }}>
          <h2>AI Art</h2>
        </Link>
      </div>
      <div className={styles.tabItem}>
        <Link href="/collection">
          <h2>Collections</h2>
        </Link>
      </div>
      <div className={styles.tabItem}>
        <Link href="/marketplace">
          <h2>Marketplace</h2>
        </Link>
      </div>
    </div>
  );
};

export default Tabs;
