"use client";
import React, { useEffect, useState } from "react";
import styles from "../page.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sideBarDetails = [
  { route: "/", items: ["Overview", "Resources"] },
  {
    route: "/collection",
    items: ["Current collection", "Sell your NFT collection"]
  },
  { route: "/resources", items: ["Overview", "Resources"] }
];

const Sidebar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const pathName = usePathname();

  useEffect(() => {
    const pageMenu = sideBarDetails.find(
      (pageMenuDetails) => pageMenuDetails.route === pathName
    );

    if (pageMenu) {
      setMenuItems(pageMenu.items);
    } else {
      setMenuItems([]);
    }
  }, [pathName]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sideBarLinks}>
        {menuItems.map((item, index) => (
          <div className={styles.link} key={index}>
            <Link
              href={
                item === "Overview"
                  ? "/"
                  : item === "Current collection"
                  ? "/collection"
                  : item === "Sell your NFT collection"
                  ? "/marketplace"
                  : `/${item.toLowerCase()}`
              }
            >
              <h2>{item}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
