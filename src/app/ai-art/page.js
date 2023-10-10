"use client";
import React, { useState, useEffect } from "react";
import MainContainer from "../components/MainContainer";
import styles from "../page.module.css";
import RowGallery from "../components/RowGallery";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

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
  console.log("🎨🤖 Generating your images...");
  const response = await fetch("/api/images", {
    method: "POST",
    body: JSON.stringify({
      prompt: prompt,
      style: chosenStyle
    })
  });

  return response.json();
};

const styleGenImgsToAdd = {
  borderRadius: "4px"
};

const AIArtPage = () => {
  const [prompt, setPrompt] = useState("");

  const [imageFPs, setImgFilePaths] = useState([]);
  const [currentJSON, setCurrentJSON] = useState([]);
  const searchParams = useSearchParams();
  const chosenPrompt = searchParams.get("starterPrompt");

  const handleClearClick = () => {
    setPrompt("");
  };

  async function onSubmit(e) {
    e.preventDefault();
    console.log("🤖Your prompt is: ", prompt);
    const imageFilePaths = await getNewImages(prompt);
    setImgFilePaths(imageFilePaths);
    console.log("🤖🎨 The generated images have been written!");
    const currentJSONImgs = await getCurrentJSON();
    console.log("🚀📝Getting JSON data");
    setCurrentJSON(currentJSONImgs.data.reverse());
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
            <div className={styles.promptIntro}>
              <h3>Prompt</h3>
              <button
                className={styles.clear}
                onClick={() => handleClearClick()}
              >
                <h3>Clear</h3>
              </button>
            </div>
            <form onSubmit={onSubmit}>
              <div className={styles.promptInput}>
                <textarea
                  className="input"
                  type="text"
                  placeholder="Describe the image you want to generate"
                  value={chosenPrompt ? chosenPrompt : prompt}
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
