"use client";
import React, { useState, useEffect } from "react";
import MainContainer from "../components/MainContainer";
import styles from "../page.module.css";
import RowGallery from "../components/RowGallery";
import Image from "next/image";

// ***************************
//     AI Generator
// ***************************

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

const styleGenImgsToAdd = {
  borderRadius: "4px"
};

const AIArtPage = () => {
  const [prompt, setPrompt] = useState();
  const [imageFPs, setImgFilePaths] = useState([]);
  const [currentJSON, setCurrentJSON] = useState([]);

  async function onSubmit(e) {
    e.preventDefault();
    console.log("🤖Your prompt is: ", prompt);
    const imageFilePaths = await getNewImages(prompt);
    setImgFilePaths(imageFilePaths);
    const currentJSONImgs = await getCurrentJSON();
    setCurrentJSON(currentJSONImgs.data);
  }

  useEffect(() => {
    async function getImages() {
      const currentImgFPs = await getCurrentGenImages();
      setImgFilePaths(currentImgFPs);
      const currentJSONImgs = await getCurrentJSON();
      const jsonData = currentJSONImgs.data.reverse();
      setCurrentJSON(jsonData);
    }
    getImages();
  }, []);

  return (
    <MainContainer>
      <div className={styles.aiGenContainer}>
        <div className={styles.aiGenContent}>
          <div className={styles.promptContainer}>
            <div className={styles.promptTitle}>
              <h3>Prompt</h3>
            </div>
            <form onSubmit={onSubmit}>
              <div className={styles.promptInput}>
                <textarea
                  className="input"
                  type="text"
                  placeholder="Describe the image you want to generate"
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <button className="button" type="submit">
                  <div className={styles.buttonText}>Generate✨</div>
                </button>
              </div>
            </form>
          </div>
          <div className={styles.recentGensContainer}>
            <div className={styles.recentGenTitle}>
              <h2> Recent Generations</h2>
            </div>
            {currentJSON?.map((item, index) => {
              return (
                <div className={styles.recentPromptContainer} key={index}>
                  <div className={styles.recentPrompt}>{item.prompt}</div>
                  <RowGallery>
                    {item.images.map((imgFp, imageIndex) => (
                      <Image
                        priority={true}
                        key={imageIndex}
                        src={imgFp}
                        width={250}
                        height={250}
                        alt={"Text"}
                        style={styleGenImgsToAdd}
                      />
                    ))}
                  </RowGallery>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default AIArtPage;
