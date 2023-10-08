import React from "react";
import styles from "../page.module.css";
import Image from "next/image";
import Link from "next/link";

const styleStarterPromptImg = {
  borderRadius: "4px",
  alignSelf: "center"
};

const StarterPrompts = ({ style }) => {
  return (
    <div className={styles.spContainer}>
      <Link href="/">
        <div className={styles.goBackButton}>👈 Go back</div>
      </Link>

      <div className={styles.starterPrompts}>
        <div className={styles.spText}>
          <h3>Choose Starter Prompt</h3>
        </div>
        <div className={styles.spGrid}>
          <div className={styles.imgItem}>
            <Image
              width={175}
              height={175}
              key={1}
              src={"/ai-art/stockphotos/1.png"}
              alt={`Starter Prompt`}
              style={styleStarterPromptImg}
            />
          </div>
          <div className={styles.imgItem}>
            <Image
              width={175}
              height={175}
              key={1}
              src={"/ai-art/stockphotos/1.png"}
              alt={`Starter Prompt`}
              style={styleStarterPromptImg}
            />
          </div>
          <div className={styles.imgItem}>
            <Image
              width={175}
              height={175}
              key={1}
              src={"/ai-art/stockphotos/1.png"}
              alt={`Starter Prompt`}
              style={styleStarterPromptImg}
            />
          </div>
          <div className={styles.imgItem}>
            <Image
              width={175}
              height={175}
              key={1}
              src={"/ai-art/stockphotos/1.png"}
              alt={`Starter Prompt`}
              style={styleStarterPromptImg}
            />
          </div>
          <div className={styles.imgItem}>
            <Image
              width={175}
              height={175}
              key={1}
              src={"/ai-art/stockphotos/1.png"}
              alt={`Starter Prompt`}
              style={styleStarterPromptImg}
            />
          </div>
          <div className={styles.imgItem}>
            <Image
              width={175}
              height={175}
              key={1}
              src={"/ai-art/stockphotos/1.png"}
              alt={`Starter Prompt`}
              style={styleStarterPromptImg}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarterPrompts;
