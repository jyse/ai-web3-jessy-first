"use client";
import React, { useEffect, useState } from "react";
import styles from "../page.module.css";
import Link from "next/link";

const details = [
  { route: "/", items: ["Overview", "Resources"] },
  {
    route: "/collections",
    items: ["Current collection", "Published collections"]
  },
  { route: "/resources", items: ["Overview", "Resources"] }
];

const getSidebarDetails = (route) => {
  const sideBarDetails = details.find((page) => page.route === route);

  if (sideBarDetails) {
    return sideBarDetails.items;
  } else {
    return [];
  }
};

const Sidebar = ({ route }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const items = getSidebarDetails(route);
    setMenuItems(items);
  }, [route]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sideBarLinks}>
        {menuItems.map((item, index) => {
          return (
            <div className={styles.link} key={index}>
              <Link href={"/" + item?.toLowerCase()}>
                <h2>{item}</h2>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
