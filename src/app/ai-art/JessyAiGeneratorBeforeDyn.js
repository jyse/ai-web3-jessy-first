"use client";
import React, { useState, useEffect } from "react";
import MainContainer from "../components/MainContainer";
import styles from "../page.module.css";
import RowGallery from "../components/RowGallery";
import Image from "next/image";

// ***************************
//     AI Generator
// ***************************

const getCurrentGenImages = async (prompt) => {
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

  async function onSubmit(e) {
    e.preventDefault();
    console.log("🤖Your prompt is: ", prompt);
    const imageFilePaths = await getNewImages(prompt);
    setImgFilePaths(imageFilePaths);
  }

  useEffect(() => {
    async function getImages() {
      const currentImgFPs = await getCurrentGenImages();
      setImgFilePaths(currentImgFPs);
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
            <div className={styles.recentPromptContainer}>
              <div className={styles.recentPrompt}>
                Futuristic astronaut girl with blue hair exploring Mars in the
                future year of 2025
              </div>
              <RowGallery>
                <Image
                  src="/gen-imgs-to-add/1.png"
                  width={250}
                  height={250}
                  alt="Art"
                  style={styleGenImgsToAdd}
                />
                <Image
                  src="/gen-imgs-to-add/2.png"
                  width={250}
                  height={250}
                  alt="Art"
                  style={styleGenImgsToAdd}
                />
                <Image
                  src="/gen-imgs-to-add/3.png"
                  width={250}
                  height={250}
                  alt="Art"
                  style={styleGenImgsToAdd}
                />
                <Image
                  src="/gen-imgs-to-add/4.png"
                  width={250}
                  height={250}
                  alt="Art"
                  style={styleGenImgsToAdd}
                />
              </RowGallery>
            </div>
            <div className={styles.recentPromptContainer}>
              <div className={styles.recentPrompt}>
                A dragon's lair in a cave near a blue ocean, with dragons
                hoarding treasure, sleeping on piles of gold, and shooting fire
                from their nostrils, mythical, detailed, adventurous,
                fantastical
              </div>
              <RowGallery>
                <Image
                  src="/gen-imgs-to-add/5.png"
                  width={250}
                  height={250}
                  alt="Art"
                  style={styleGenImgsToAdd}
                />
                <Image
                  src="/gen-imgs-to-add/6.png"
                  width={250}
                  height={250}
                  alt="Art"
                  style={styleGenImgsToAdd}
                />
                <Image
                  src="/gen-imgs-to-add/7.png"
                  width={250}
                  height={250}
                  alt="Art"
                  style={styleGenImgsToAdd}
                />
                <Image
                  src="/gen-imgs-to-add/8.png"
                  width={250}
                  height={250}
                  alt="Art"
                  style={styleGenImgsToAdd}
                />
              </RowGallery>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default AIArtPage;
