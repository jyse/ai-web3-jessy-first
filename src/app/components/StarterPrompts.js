"use client";
import React, { useState, useEffect } from "react";
import styles from "../page.module.css";
import Image from "next/image";
import Link from "next/link";

const styleStarterPromptImg = {
  borderRadius: "4px",
  alignSelf: "center"
};

const getPromptImg = (starterPrompt) => {
  console.log("🔥🚀 Starter Prompt: 🎨🤖✨ ", starterPrompt);
};

const getSPJSON = async () => {
  const response = await fetch("/api/sp-json", {
    method: "GET"
  });
  return response.json();
};

const filterObjectsByStyle = (arrayOfObjects, style) => {
  return arrayOfObjects.filter((obj) => obj.style == style);
};

const StarterPrompts = ({ styleStarterPrompts }) => {
  const [spJSONObjects, setSPJSON] = useState([]);

  useEffect(() => {
    async function getSPImages() {
      const spJSON = await getSPJSON();
      const filteredSPObjects = await filterObjectsByStyle(
        spJSON.data,
        styleStarterPrompts
      );
      setSPJSON(filteredSPObjects);
    }
    getSPImages();
  }, []);

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
          {spJSONObjects?.map((spObject, index) => {
            return (
              <Link
                href={{
                  pathname: "/ai-art",
                  query: { starterPrompt: spObject.prompt }
                }}
                key={index}
              >
                <div
                  className={styles.imgItem}
                  onClick={() => getPromptImg(spObject.prompt)}
                >
                  <Image
                    width={175}
                    height={175}
                    key={1}
                    src={spObject.imageFile}
                    alt={spObject.imageFile}
                    style={styleStarterPromptImg}
                    priority={true}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StarterPrompts;
