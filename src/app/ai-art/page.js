"use client";
import React, { useState } from "react";
import MainContainer from "../components/MainContainer";
import styles from "../page.module.css";
import RowGallery from "../components/RowGallery";
import Image from "next/image";

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

const styleGenImgsToAdd = {
  borderRadius: "4px"
};

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
