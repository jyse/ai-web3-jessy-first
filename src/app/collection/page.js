"use client";
import React, { useEffect, useState } from "react";
import MainContainer from "../components/MainContainer";
import RowGallery from "../components/RowGallery";
import styles from "../page.module.css";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const makeRequest = async (url, method = "GET", body) => {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return response.json();
};

const styleGenImgsToAdd = {
  borderRadius: "4px"
};

const CollectionPage = () => {
  const [collImgFPs, setCollImgFPs] = useState([]);
  const [collJSON, setCollJSON] = useState([]);
  const [genImgFPs, setGenImgFPs] = useState([]);
  const [genJSON, setGenJSON] = useState([]);

  const addImage = async (imgFp) => {
    const response = await makeRequest("/api/gen-json", "POST", {
      addedImgFp: imgFp
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

  useEffect(() => {
    async function getImages() {
      const genImgFPs = await makeRequest("/api/images");
      setGenImgFPs(genImgFPs);
      const genJSON = await makeRequest("/api/gen-json");
      console.log(genJSON, "where is the genJSON here? 🐲🐲🐲🐲🐲🐲🐲🐲");
      setGenJSON(genJSON.data.reverse());
      const collImgFPs = await makeRequest("/api/collection");
      setCollImgFPs(collImgFPs);
      const collJSON = await makeRequest("/api/collection-json");
      setCollJSON(collJSON.data.reverse());
    }
    getImages();
  }, []);

  return (
    <MainContainer>
      <Toaster position="top-center" />
      <div className={styles.mainPageContent}>
        <div className={styles.mainContent}>
          <div className={styles.sectionContainer}>
            <div className={styles.recentGenTitle}>
              <h2> 🔥🎨 AI Art Frontmania Collection </h2>
            </div>
            <div className={styles.contentContainer}>
              <RowGallery>
                {collJSON && collJSON.length > 0
                  ? collJSON.map((obj, index) => (
                      <div className={styles.addImage} key={index}>
                        <Image
                          priority={true}
                          src={obj.image}
                          width={250}
                          height={250}
                          alt={"Text"}
                          style={styleGenImgsToAdd}
                        />
                      </div>
                    ))
                  : ""}
              </RowGallery>
            </div>
          </div>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionTitle}>
              <h2> 🔥✅ Add more images! </h2>
            </div>
            {genJSON?.map((item, index) => {
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

export default CollectionPage;
