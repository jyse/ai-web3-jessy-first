import React from "react";
import styles from "../page.module.css";
import Image from "next/image";
import Link from "next/link";
import MainContainer from "../components/MainContainer";
import RowGallery from "../components/RowGallery";

const lastImageAIStyle = {
  borderBottomRightRadius: "4px"
};

const firstImageAIStyle = {
  borderBottomLeftRadius: "4px"
};

const styleGenImgsToAdd = {
  borderRadius: "4px"
};

const stylesPrompt = [
  { name: "Stock Photos", path: "/spImgs/stockphotos/" },
  { name: "Characters", path: "/spImgs/characters/" },
  { name: "Wallpapers", path: "/spImgs/wallpapers/" },
  { name: "Logos", path: "/spImgs/logos/" },
  { name: "Art", path: "/spImgs/art/" }
];

const OverviewPage = () => {
  return (
    <MainContainer>
      <div className={styles.welcomeContent}>
        <div className={styles.welcomeText}>
          <h1>Welcome at ArtIVerse Studio!🎨🔥</h1>
          <h2>Art made for the Metaverse</h2>
        </div>
        <div className={styles.stepsContainer}>
          <div className={styles.step}>
            <div className={styles.stepIntro}>
              <div className={styles.icon}>🎨</div>
              <div className={styles.title}>
                <h2>Create art with AI</h2>
                <h3>Describe what you want and generate new images.</h3>
              </div>
            </div>
            <div className={styles.stepContent}>
              <div className={styles.gridAiStyles}>
                {stylesPrompt?.map((styleForPrompt, index) => {
                  return (
                    <div className={styles.styleBox} key={index}>
                      <Link href={styleForPrompt.path}>
                        <div className={styles.styleBoxTitle}>
                          <h2>{styleForPrompt.name}</h2>
                        </div>
                        <div className={styles.rowAIStyles}>
                          {[1, 2, 3, 4].map((imageIndex) => {
                            return (
                              <Image
                                key={imageIndex}
                                src={`${styleForPrompt.path}${imageIndex}.png`}
                                width={85}
                                height={85}
                                alt={styleForPrompt.name}
                                style={
                                  (imageIndex == 1 && firstImageAIStyle) ||
                                  (imageIndex == 4 && lastImageAIStyle)
                                }
                                priority={true}
                              />
                            );
                          })}
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepIntro}>
              <div className={styles.icon}>🖼️</div>
              <div className={styles.title}>
                <h2> Turn art into a NFT collection</h2>
                <h3> Add more images to your current collection</h3>
              </div>
            </div>
            <div className={styles.stepContent}>
              {/* //comment: work on the spacing here at the last image */}
              <RowGallery>
                <Image
                  src="/gen-imgs-to-add/1.png"
                  width={250}
                  height={250}
                  alt="Character"
                  style={styleGenImgsToAdd}
                  priority={true}
                />
                <Image
                  src="/gen-imgs-to-add/2.png"
                  width={250}
                  height={250}
                  alt="Character"
                  style={styleGenImgsToAdd}
                  priority={true}
                />
                <Image
                  src="/gen-imgs-to-add/3.png"
                  width={250}
                  height={250}
                  alt="Character"
                  style={styleGenImgsToAdd}
                  priority={true}
                />
                <Image
                  src="/gen-imgs-to-add/4.png"
                  width={250}
                  height={250}
                  alt="Character"
                  style={styleGenImgsToAdd}
                  priority={true}
                />
              </RowGallery>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepIntro}>
              <div className={styles.icon}>💰</div>
              <div className={styles.title}>
                <h2> Publish NFT collection on a marketplace for sale!</h2>
                <h3> Let's mint!</h3>
              </div>
            </div>
            <div className={styles.stepContent}>
              <h2>The goal is to have our collection here </h2>
              {/* <Link href="https://testnets.opensea.io/...">
               <h2>here</h2>
               </Link>  */}
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default OverviewPage;
