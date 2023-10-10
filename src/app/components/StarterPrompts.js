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
  console.log(starterPrompt, "🐼💖🐲 putting prompt inside input");
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

const StarterPrompts = ({ chosenStyle }) => {
  const [spJSONObjects, setSPJSON] = useState([]);

  useEffect(() => {
    async function getSPImages() {
      const spJSON = await getSPJSON();
      const filteredSPObjects = await filterObjectsByStyle(
        spJSON.data,
        chosenStyle
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
              <div
                className={styles.imgItem}
                onClick={() => getPromptImg(spObject.prompt)}
                key={index}
              >
                <Image
                  width={175}
                  height={175}
                  key={1}
                  src={spObject.imageFile}
                  alt={spObject.imageFile}
                  style={styleStarterPromptImg}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StarterPrompts;
