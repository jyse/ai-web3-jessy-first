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
  const [amount, setAmount] = useState(0);
  const [collectionIPFS, setCollectionIPSF] = useState(false);
  const [readyForSM, setReadyForSM] = useState(false);
  const [CID, setCID] = useState("");

  const addImage = async (imgFp) => {
    const result = await makeRequest("/api/gen-json", "POST", {
      addedImgFp: imgFp
    });

    if (result.success) {
      toast.success("🔥🖼️✨Image succesfully added!", {
        duration: 8000
      });
      setCollJSON([{ image: imgFp }, ...collJSON]);
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
      setGenJSON(genJSON.data.reverse());
      const collImgFPs = await makeRequest("/api/collection");
      setCollImgFPs(collImgFPs);
      const collJSON = await makeRequest("/api/collection-json");
      const amountCollImgs = collJSON.data.length;
      setAmount(amountCollImgs);
      setCollJSON(collJSON.data.reverse());
    }
    getImages();
  }, []);

  const uploadToIpfs = async () => {
    toast.loading("🔥Uploading to IPFS");
    try {
      let jsonDir = await makeRequest("/api/ipfs", "POST", {
        collection: collJSON
      });
      console.log(
        jsonDir,
        "what is in IPFSJSON DIR 🔥🔥🔥🔥🔥🔥🔥🍬🍬🍬🍬🍬🍬"
      );
      if (jsonDir?.IpfsHash) {
        console.log(
          "🔥Retrieved CID of collection JSON 📝: ",
          jsonDir.IpfsHash
        );
      }
    } catch (error) {
      console.log("👹✨ Error at retrieving CID of JSON at IPFS");
    }
  };

  useEffect(() => {
    // CID? Proof that the contract has succesfully been deployed
    // setstate regarding the toaster and referring to the market place if possible - maybe set a timer
  }, []);

  useEffect(() => {
    if (collectionIPFS) {
      toast.success("✅ Upload to IPFS was succesful!", {
        duration: 6000
      });
      // disable upload IPFS button
      setIPFSButton(false);
      toast.info("Now it's time to deploy the smart contract!");
      setReadyForSM(true);
      // activate the deploy button
    }
  }, [collectionIPFS]);

  useEffect(() => {
    if (collectionIPFS) {
      const timer = setTimeout(() => setReadyForSM(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [collectionIPFS]);

  return (
    <MainContainer>
      <Toaster position="top-center" />
      <div className={styles.mainPageContent}>
        {collJSON && collJSON.length > 0 ? (
          <div className={styles.mainContent}>
            <div className={styles.sectionContainer}>
              <div className={styles.sectionTop}>
                <div className={styles.sectionTitle}>
                  <h2> 🔥🎨 AI Art Frontmania Collection </h2>
                  <p>{amount > 0 ? `👉 ${amount} Images added` : ""}</p>
                </div>
                <div className={styles.upload} onClick={() => uploadToIpfs()}>
                  Upload to IPFS
                </div>
                <div className={styles.deploy} onClick={() => deploySm()}>
                  Deploy
                </div>
              </div>
              <div className={styles.contentContainer}>
                <RowGallery>
                  {collJSON?.map((obj, index) => (
                    <div className={styles.addImage} key={index}>
                      <Image
                        priority={true}
                        src={obj.imageFile}
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
        ) : null}
      </div>
    </MainContainer>
  );
};

export default CollectionPage;
