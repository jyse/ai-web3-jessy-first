"use client";
import React, { useEffect, useState } from "react";
import MainContainer from "../components/MainContainer";
import RowGallery from "../components/RowGallery";
import styles from "../page.module.css";
import Image from "next/image";

const getCollectionImages = async () => {
  const response = await fetch("/api/collection", {
    method: "GET"
  });
  return response.json();
};

const getCollectionJSON = async () => {
  const response = await fetch("/api/collection-json", {
    method: "GET"
  });
  return response.json();
};

const styleGenImgsToAdd = {
  borderRadius: "4px"
};

const CollectionPage = () => {
  const [imageFPs, setImgFilePaths] = useState([]);
  const [currentGenJSON, setCurrentGenJSON] = useState([]);
  const [collectionJSON, setCollectionJSON] = useState([]);
  const [getImgsJSON, setGenImgsJson] = useState([]);

  useEffect(() => {
    async function getImages() {
      const currentImgFPs = await getCollectionImages();
      setImgFilePaths(currentImgFPs);
      const currentJSONImgs = await getCollectionJSON();
      const jsonData = currentJSONImgs.data.reverse();
      setCollectionJSON(jsonData);
      console.log(collectionJSON, "what is current JSON here? ");
    }
    getImages();
  }, []);

  return (
    <MainContainer>
      <div className={styles.mainPageContent}>
        <div className={styles.mainContent}>
          <div className={styles.sectionContainer}>
            <div className={styles.recentGenTitle}>
              <h2> 🔥🎨 AI Art Frontmania Collection </h2>
            </div>
            <div className={styles.contentContainer}>
              <RowGallery>
                {collectionJSON?.map((obj, index) => (
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
                ))}
              </RowGallery>
            </div>
          </div>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionTitle}>
              <h2> Recent Generations </h2>
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

export default CollectionPage;
