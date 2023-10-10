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
  {
    name: "Stock Photos",
    path: "/spImgs/stockphotos/",
    route: "/stockphotos"
  },
  { name: "Characters", path: "/spImgs/characters/", route: "/characters" },
  { name: "Wallpapers", path: "/spImgs/wallpapers/", route: "/wallpapers" },
  { name: "Logos", path: "/spImgs/logos/", route: "/logos" },
  { name: "Art", path: "/spImgs/art/", route: "/art" }
];

const spStyle = () => {
  console.log("sp Style clicked upon 🐲🐲🐲🐲");
};

const OverviewPage = () => {
  return (
    <MainContainer>
      <div className={styles.overviewContainer}>
        <div className={styles.overviewContent}>
          <div className={styles.welcomeText}>
            <h1>Welcome at ArtIVerse Studio!🎨🔥</h1>
            <h2>Art made for the Metaverse</h2>
          </div>
          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <Link href="/ai-art">
                <div className={styles.stepIntro}>
                  <div className={styles.icon}>🎨</div>
                  <div className={styles.title}>
                    <h2>Create art with AI</h2>
                    <h3>Describe what you want and generate new images.</h3>
                  </div>
                </div>
              </Link>
              <div className={styles.stepContent}>
                <div className={styles.gridAiStyles}>
                  {stylesPrompt?.map((styleForPrompt, index) => {
                    let chosenStyle = styleForPrompt.route.slice(1);
                    return (
                      <div
                        className={styles.styleBox}
                        key={index}
                        onClick={() => {
                          spStyle(chosenStyle);
                        }}
                      >
                        <Link
                          href={{
                            pathname: "/ai-art",
                            query: { style: chosenStyle }
                          }}
                        >
                          <div className={styles.styleBoxTitle}>
                            <h2>{styleForPrompt.name}</h2>
                          </div>
                          <div className={styles.rowAIStyles}>
                            {[1, 2, 3, 4].map((imageIndex) => {
                              return (
                                <Image
                                  key={imageIndex}
                                  src={`${styleForPrompt.path}${imageIndex}.png`}
                                  width={80}
                                  height={80}
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
              <Link href="/collection">
                <div className={styles.stepIntro}>
                  <div className={styles.icon}>🖼️</div>
                  <div className={styles.title}>
                    <h2> Turn art into a NFT collection</h2>
                    <h3> Add more images to your current collection</h3>
                  </div>
                </div>
              </Link>
              <div className={styles.stepContent}>
                <RowGallery>
                  {[1, 2, 3, 4].map((imageIndex) => {
                    return (
                      <Image
                        key={imageIndex}
                        src={`/output/genImgs/${imageIndex}.png`}
                        width={250}
                        height={250}
                        alt={"Image to be Added"}
                        style={
                          (imageIndex == 1 && firstImageAIStyle) ||
                          (imageIndex == 4 && lastImageAIStyle)
                        }
                        priority={true}
                      />
                    );
                  })}
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
      </div>
    </MainContainer>
  );
};

export default OverviewPage;
