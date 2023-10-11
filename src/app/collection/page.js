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
  const [CID, setCID] = useState("");
  const [contractDetails, setContractDetails] = useState("");

  const addImage = async (imgFp) => {
    const result = await makeRequest("/api/gen-json", "POST", {
      addedImgFp: imgFp
    });

    if (result.success) {
      toast.success("🔥🖼️✨Image succesfully added!", {
        duration: 8000
      });
      setCollJSON([{ imageFile: imgFp }, ...collJSON]);
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
    // Display a loading toast while uploading to IPFS.
    const loadingToast = toast.loading("🔥Uploading to IPFS");

    try {
      let jsonDir = await makeRequest("/api/ipfs", "POST", {});
      toast.dismiss(loadingToast);

      if (jsonDir) {
        setCID(jsonDir);

        toast.success(`✅✨ Succesful upload to IPFS!!📝`, {
          duration: 6000
        });
        deploySm(jsonDir);
      } else {
        toast.error("❌ No IPFS hash found for the collection JSON");
      }
    } catch (error) {
      toast.error("👹✨ Error at retrieving CID of JSON at IPFS");
    }
  };

  const deploySm = async (jsonDir) => {
    toast.loading("📝😃✨Deploying contract...");

    try {
      let contractDetails = await makeRequest("/api/contract", "POST", {});
    } catch (error) {
      console.log("👹✨ Error deploying the smart contract");
    }

    setContractDetails(contractDetails);
  };

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
                <div className={styles.stepsNFT}>
                  <button
                    className={styles.upload}
                    onClick={() => uploadToIpfs()}
                  >
                    Upload to IPFS
                  </button>
                  <button className={styles.deploy} onClick={() => deploySm()}>
                    Deploy
                  </button>
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
