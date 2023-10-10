"use client";
import React, { useState, useEffect } from "react";
import MainContainer from "../components/MainContainer";
import styles from "../page.module.css";
import RowGallery from "../components/RowGallery";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

// *******************************************************************
//                        AI Generator
// *******************************************************************

const getCurrentJSON = async () => {
  const response = await fetch("/api/gen-json", {
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
      prompt: prompt
    })
  });

  return response.json();
};

const styleGenImgsToAdd = {
  borderRadius: "4px"
};

const AIArtPage = () => {
  const [imageFPs, setGenImgFilePaths] = useState([]);
  const [currentGenJSON, setCurrentGenJSON] = useState([]);
  const searchParams = useSearchParams();
  const chosenPrompt = searchParams.get("starterPrompt");
  const [prompt, setPrompt] = useState(chosenPrompt ? chosenPrompt : "");

  const handleClearClick = () => {
    setPrompt("");
  };
  const addImage = async (imgFp) => {
    const response = await fetch("/api/gen-json", {
      method: "POST",
      body: JSON.stringify({
        addedImgFp: imgFp
      })
    });

    if (response.ok) {
      toast.success("🔥🖼️✨Image succesfully added!", {
        duration: 8000
      });

      return response.json();
    } else {
      toast.error("Error adding image to collection");
      throw new Error("Image upload failed");
    }
  };

  async function onSubmit(e) {
    e.preventDefault();
    console.log("🤖Your prompt is: ", prompt);
    toast.loading("🔥🧑‍🍳🤖 Generating images...");

    const imageFilePaths = await getNewImages(prompt);
    setGenImgFilePaths(imageFilePaths);

    console.log("🤖🎨 The generated images have been written!");
    toast.dismiss();
    toast.success("🔥Images succesfully generated!", {
      duration: 8000
    });

    const currentJSONImgs = await getCurrentJSON();
    console.log("🚀📝Getting JSON data");
    setCurrentGenJSON(currentJSONImgs.data.reverse());
  }

  useEffect(() => {
    async function getImages() {
      const currentImgFPs = await getCurrentGenImages();
      setGenImgFilePaths(currentImgFPs);
      const currentJSONImgs = await getCurrentJSON();
      const jsonData = currentJSONImgs.data.reverse();
      setCurrentGenJSON(jsonData);
    }
    getImages();
  }, []);

  useEffect(() => {
    setPrompt(chosenPrompt ? chosenPrompt : "");
  }, [chosenPrompt]);

  return (
    <MainContainer>
      <Toaster position="top-center" />
      <div className={styles.mainPageContainer}>
        <div className={styles.mainContent}>
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
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <button className="button" type="submit">
                  <div className={styles.buttonText}>Generate✨</div>
                </button>
              </div>
            </form>
          </div>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionTitle}>
              <h2> Recent Generations</h2>
            </div>
            {currentGenJSON?.map((item, index) => {
              return (
                <div className={styles.contentContainer} key={index}>
                  <div className={styles.recentPrompt}>{item.prompt}</div>
                  <RowGallery>
                    {item.images.map((imgFp, imageIndex) => (
                      <div
                        className={styles.addImage}
                        onClick={() => addImage(imgFp)}
                        key={imageIndex}
                      >
                        <Image
                          priority={true}
                          src={imgFp}
                          width={250}
                          height={250}
                          alt={"Text"}
                          style={styleGenImgsToAdd}
                        />
                      </div>
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
