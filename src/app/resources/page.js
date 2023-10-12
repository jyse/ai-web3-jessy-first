import React from "react";
import styles from "../page.module.css";
import MainContainer from "../components/MainContainer";

const ResourcesContent = () => {
  return (
    <MainContainer>
      <div className={styles.resourcesContainer}>
        <div className={styles.resourcesContent}>
          <h1>Resources</h1>
          <br />
          <p>Dreamstudio API (AI Art Generator)</p>
          <p>👉 https://dreamstudio.com/api/</p>
          <br />
          <p>Opensea</p>
          <p>
            👉 NFT Marketplace, minting place and interface to view NFT data on
            the blockchain
          </p>
          <p>🌐 www.opensea.io</p>

          <br />
          <p>Remix IDE</p>
          <p>👉 local environment to create, manage and deploy contracts</p>
          <p>
            👉 also possible to use as tool to deploy on Goerli Testnet Network{" "}
          </p>
          <p>🌐 www.remix-project.org </p>
          <p>🚀 Click on Remix IDE to work</p>

          <br />
          <p>Etherscan - you have different ones: </p>
          <p>👉 for the Main network of Ethereum: https://etherscan.io/</p>
          <p>👉 for the Goerli Testnet Network: https://goerli.etherscan.io/</p>
          <br />
          <p>Ethers.js </p>
          <p>🚀 https://docs.ethers.io/v5/</p>
          <br />
          <p>Pinata (Gatekeeper to IPFS)</p>
          <p>👉 www.pinata.cloud</p>
          <br />
          <p>IPFS (Decentralized storage)</p>
          <p>👉 www.ipfs.tech </p>

          <br />
          <p>Cool NFT MarketPlaces </p>
          <p>👉 NFT Gamestop </p>
          <p>👉 Rarible </p>
          <p>👉 OpenSea </p>
          <p>👉 Looksrare</p>
          <p>Cool NFT collection to check out on OpenSea </p>
          <p>👉 Doodles </p>
          <p>👉 Bored Yacht Ape Club </p>
          <p>👉 Azuki </p>
          <p>👉 Adidas in the Metaverse </p>
        </div>
      </div>
    </MainContainer>
  );
};

export default ResourcesContent;
