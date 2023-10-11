import { readFile } from "fs/promises";
import { join } from "path";
import fs from "fs";
const path = require("path");
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK({
  pinataApiKey: "07e75d9d99d4c394c5bf",
  pinataSecretApiKey:
    "0954cc888ceb9dd555634686ceef8f48a6c3b3ef508cd4d32b2349d7d0e49f4f"
});

const collImagesPath = path.resolve("./public/frontmania-collection/");
const jsonFilePath = join(process.cwd(), "public", "JSON", "collection.json");

const res = await pinata.testAuthentication();
console.log(res);

const uploadImgsToIpfs = async (hashImgDirIpfs) => {
  const options = {
    pinataMetadata: {
      name: hashImgDirIpfs
    },
    pinataOptions: {
      cidVersion: 0
    }
  };

  try {
    const ipfsNFTDir = await pinata.pinFromFS(collImagesPath, options);
    console.log(ipfsNFTDir, "what is in ipfsNFT DIRECTORY? 🔥🐲");
    return ipfsNFTDir.IpfsHash;
  } catch (error) {
    console.log(error("Error uploading images to IPFS:", error));
  }
};

const uploadJSONtoIpfs = async (hashImgDirIpfs) => {
  const collectionFilePath = join(
    process.cwd(),
    "public",
    "JSON",
    "collection.json"
  );

  try {
    const collectionContent = await readFile(collectionFilePath, "utf-8");
    const collectionData = JSON.parse(collectionContent);
    console.log(collectionData, " what is in collectionData?");

    for (let i = 0; i < collectionData.length; i++) {
      const fileName = `${i + 1}.png`;
      collectionData[i].image = `ipfs://${hashImgDirIpfs}/${fileName}`;
    }

    fs.writeFileSync(collectionFilePath, JSON.stringify(collectionData));

    const jsonOptions = {
      pinataMetadata: {
        name: "collection.json"
      }
    };

    const jsonResult = await pinata.pinJSONToIPFS(collectionData, jsonOptions);
    console.log(jsonResult, "what is with json Result? 🔥");
    console.log("Uploaded updated JSON data to IPFS:", jsonResult);

    return jsonResult.IpfsHash;
  } catch (error) {
    console.error("Error reading/updating JSON file:", error);
    throw error;
  }
};

export async function POST(request) {
  const { collection } = await request.json();

  const hashImgDirIpfs = "QmNSJGcaLPuKPxoD3kfhQXJPbrCBM8W5HyFKWWn6aahSU4";
  const hashJSONDirIpfs = "QmTNQ41NzVRghB36TtNaRZ8xtJ1SqeMn3oSjS75MNo1zbL;";

  const imgHash = await uploadImgsToIpfs(hashImgDirIpfs);
  const jsonHash = await uploadJSONtoIpfs(imgHash);
  console.log(jsonHash, "JSON HASH");

  return new Response(JSON.stringify(jsonHash));
}
