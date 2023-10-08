"use client";
import React, { useState } from "react";
import MainContainer from "../components/MainContainer";
import styles from "../page.module.css";

// ***************************
//     AI Generator
// ***************************

// const getImages = async (prompt) => {
//   const response = await fetch("/api/images", {
//     method: "POST",
//     body: JSON.stringify({
//       prompt: prompt
//     })
//   });

//   const responseData = await response.json();

//   if (responseData.responseID) {
//     console.log("GET REQUEST 🚀");
//     const getImageResponse = await fetch(`/api/images`, {
//       method: "GET"
//     });
//   }
// };

const AIArtPage = () => {
  const [prompt, setPrompt] = useState();

  console.log(prompt, "what is prompt here? ");

  async function onSubmit(e) {
    e.preventDefault();
    // add prompt functionality later
    console.log("👉 THE PROMPT IS: ", prompt, "🔥🔥🔥");

    const posts = await getImages(prompt);
  }

  return (
    <MainContainer>
      <div className={styles.aiGenContainer}>
        <div className={styles.aiGenContent}>
          <div className={styles.promptContainer}>
            <div className={styles.promptTitle}>
              <h3>Prompt</h3>
            </div>
            <div className={styles.promptInput}>
              <form onSubmit={onSubmit}>
                <textarea
                  className="input"
                  type="text"
                  placeholder="Describe the image you want to generate"
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </form>
            </div>
            <button className="button" type="submit">
              <div className={styles.buttonText}>Generate✨</div>
            </button>
          </div>

          <div className={styles.genImgsContainer}>
            <div className={styles.genImgsTitle}>
              <h1>Recent Generations</h1>
            </div>
            <div className={styles.generatedImgs}>
              <div className={styles.prompgGenImgs}>
                Astronaut girl with dark blue hair
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default AIArtPage;
