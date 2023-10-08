import React from "react";
import styles from "../page.module.css";
import Image from "next/image";
import Link from "next/link";

const lastImageAIStyle = {
  borderBottomRightRadius: "4px"
};

const firstImageAIStyle = {
  borderBottomLeftRadius: "4px"
};

const styleGenImgsToAdd = {
  borderRadius: "4px; "
};

const Welcome = () => {
  return (
    <div className={styles.mainContainer}>
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
                <div className={styles.styleBox}>
                  <Link href="/ai-art/stockphotos">
                    <div className={styles.styleBoxTitle}>
                      <h2>Stock Photos</h2>
                    </div>
                    <div className={styles.rowAIStyles}>
                      <Image
                        src="/ai-styles/stockphotos/1.png"
                        width={85}
                        height={85}
                        alt="Character"
                        style={firstImageAIStyle}
                      />
                      <Image
                        src="/ai-styles/stockphotos/2.png"
                        width={85}
                        height={85}
                        alt="Character"
                      />
                      <Image
                        src="/ai-styles/stockphotos/3.png"
                        width={85}
                        height={85}
                        alt="Character"
                      />
                      <Image
                        src="/ai-styles/stockphotos/4.png"
                        width={85}
                        height={85}
                        alt="Character"
                        style={lastImageAIStyle}
                      />
                    </div>
                  </Link>
                </div>

                <div className={styles.styleBox}>
                  <Link href="/ai-art/characters">
                    <div className={styles.styleBoxTitle}>
                      <h2>Characters</h2>
                    </div>
                    <div className={styles.rowAIStyles}>
                      <Image
                        src="/ai-styles/characters/1.png"
                        width={85}
                        height={85}
                        alt="Characters"
                        style={firstImageAIStyle}
                      />
                      <Image
                        src="/ai-styles/characters/2.png"
                        width={85}
                        height={85}
                        alt="Characters"
                      />
                      <Image
                        src="/ai-styles/characters/3.png"
                        width={85}
                        height={85}
                        alt="Characters"
                      />
                      <Image
                        src="/ai-styles/characters/4.png"
                        width={85}
                        height={85}
                        alt="Characters"
                        style={lastImageAIStyle}
                      />
                    </div>
                  </Link>
                </div>
                <div className={styles.styleBox}>
                  <Link href="/ai-art/wallpapers">
                    <div className={styles.styleBoxTitle}>
                      <h2>Wallpapers</h2>
                    </div>
                    <div className={styles.rowAIStyles}>
                      <Image
                        src="/ai-styles/wallpapers/1.png"
                        width={85}
                        height={85}
                        alt="Wallpaper"
                        style={firstImageAIStyle}
                      />
                      <Image
                        src="/ai-styles/wallpapers/2.png"
                        width={85}
                        height={85}
                        alt="Wallpaper"
                      />
                      <Image
                        src="/ai-styles/wallpapers/3.png"
                        width={85}
                        height={85}
                        alt="Wallpaper"
                      />
                      <Image
                        src="/ai-styles/wallpapers/4.png"
                        width={85}
                        height={85}
                        alt="Wallpaper"
                        style={lastImageAIStyle}
                      />
                    </div>
                  </Link>
                </div>
                <div className={styles.styleBox}>
                  <Link href="/ai-art/logos">
                    <div className={styles.styleBoxTitle}>
                      <h2>Logos</h2>
                    </div>
                    <div className={styles.rowAIStyles}>
                      <Image
                        src="/ai-styles/logos/1.png"
                        width={85}
                        height={85}
                        alt="logo"
                        style={firstImageAIStyle}
                      />
                      <Image
                        src="/ai-styles/logos/2.png"
                        width={85}
                        height={85}
                        alt="logo"
                      />
                      <Image
                        src="/ai-styles/logos/3.png"
                        width={85}
                        height={85}
                        alt="logo"
                      />
                      <Image
                        src="/ai-styles/logos/4.png"
                        width={85}
                        height={85}
                        alt="logo"
                        style={lastImageAIStyle}
                      />
                    </div>
                  </Link>
                </div>
                <div className={styles.styleBox}>
                  <Link href="/ai-art/art">
                    <div className={styles.styleBoxTitle}>
                      <h2>Art</h2>
                    </div>
                    <div className={styles.rowAIStyles}>
                      <Image
                        src="/ai-styles/art/1.png"
                        width={85}
                        height={85}
                        alt="Character"
                        style={firstImageAIStyle}
                      />
                      <Image
                        src="/ai-styles/art/2.png"
                        width={85}
                        height={85}
                        alt="Character"
                      />
                      <Image
                        src="/ai-styles/art/3.png"
                        width={85}
                        height={85}
                        alt="Character"
                      />
                      <Image
                        src="/ai-styles/art/4.png"
                        width={85}
                        height={85}
                        alt="Character"
                        style={lastImageAIStyle}
                      />
                    </div>
                  </Link>
                </div>
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
              <div className={styles.genImgsToAdd}>
                <Image
                  src="/gen-imgs-to-add/1.png"
                  width={250}
                  height={250}
                  alt="Character"
                  style={styleGenImgsToAdd}
                />
                <Image
                  src="/gen-imgs-to-add/1.png"
                  width={250}
                  height={250}
                  alt="Character"
                  style={styleGenImgsToAdd}
                />
                <Image
                  src="/gen-imgs-to-add/1.png"
                  width={250}
                  height={250}
                  alt="Character"
                  style={styleGenImgsToAdd}
                />
                <Image
                  src="/gen-imgs-to-add/1.png"
                  width={250}
                  height={250}
                  alt="Character"
                  style={styleGenImgsToAdd}
                />
              </div>
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
  );
};

export default Welcome;
