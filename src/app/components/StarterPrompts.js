"use client";
import React, { useState, useEffect } from "react";
import styles from "../page.module.css";
import Image from "next/image";
import Link from "next/link";

const styleStarterPromptImg = {
  borderRadius: "4px",
  alignSelf: "center"
};

const getCurrentJSON = async () => {
  const response = await fetch("/api/json", {
    method: "GET"
  });
  return response.json();
};

const getCurrentGenImages = async () => {
  const response = await fetch("/api/images", {
    method: "GET"
  });
  return response.json();
};

const getNewImages = async (prompt) => {
  const response = await fetch("/api/images", {
    method: "POST",
    body: JSON.stringify({
      prompt: prompt
      //Add style
    })
  });

  return response.json();
};

const StarterPrompts = ({ style }) => {
  const [prompt, setPrompt] = useState();
  const [imageFPs, setImgFilePaths] = useState([]);
  const [currentJSON, setCurrentJSON] = useState([]);

  useEffect(() => {
    async function getSPImages() {
      // const jsonFile = await writeSPJson();
      // const currentImgFPs = await getCurrentGenImages();
      // setImgFilePaths(currentImgFPs);
      // const currentJSONImgs = await getCurrentJSON();
      // const jsonData = currentJSONImgs.data.reverse();
      // setCurrentJSON(jsonData);
    }
    getSPImages();
  }, [imageFPs]);

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
