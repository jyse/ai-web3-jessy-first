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

const uploadImgsToIpfs = async () => {
  const imagesPath = join(
    process.cwd(),
    "public",
    "frontmania-collection",
    "images"
  );
  const options = {
    pinataMetadata: {
      name: "Images",
      keyvalues: {
        folder: "NFTsFolder",
        timestamp: Date.now()
      }
    },
    pinataOptions: {
      cidVersion: 0
    }
  };

  try {
    const ipfsNFTDir = await pinata.pinFromFS(imagesPath, options);
    console.log(ipfsNFTDir, "👀 what wordt hier terug gegeven");
    return ipfsNFTDir.IpfsHash;
  } catch (error) {
    console.log("👹✨Error uploading images to IPFS");
  }
};

const uploadJSONtoIpfs = async (imgHash) => {
  const collectionFilePath = join(
    process.cwd(),
    "public",
    "JSON",
    "collection.json"
  );

  try {
    const collectionContent = await readFile(collectionFilePath, "utf-8");
    const collectionData = JSON.parse(collectionContent);

    for (let i = 0; i < collectionData.length; i++) {
      const fileName = `${i + 1}.png`;
      collectionData[i].image = `ipfs://${imgHash}/${fileName}`;
    }

    fs.writeFileSync(collectionFilePath, JSON.stringify(collectionData));

    const updatedCollectionContent = await readFile(
      collectionFilePath,
      "utf-8"
    );
    const updatedData = JSON.parse(updatedCollectionContent);
    const jsonDir = path.join(
      process.cwd(),
      "public",
      "frontmania-collection",
      "json"
    );

    if (!fs.existsSync(jsonDir)) {
      fs.mkdirSync(jsonDir, { recursive: true });
    }

    for (let i = 0; i < updatedData.length; i++) {
      let filePath = path.join(jsonDir, `${i + 1}.json`);
      fs.writeFile(filePath, JSON.stringify(updatedData[i], null, 2), (err) => {
        if (err) throw err;
      });
    }

    const options = {
      pinataMetadata: {
        name: "JSON Objects",
        keyvalues: {
          folder: "JSON",
          timestamp: Date.now()
        }
      },

      pinataOptions: {
        cidVersion: 0
      }
    };
    const JSONPath = path.resolve("./public/frontmania-collection/json/");
    const jsonDirDetails = await pinata.pinFromFS(JSONPath, options);

    return jsonDirDetails.IpfsHash;
  } catch (error) {
    console.log("👹✨Error reading/updating JSON file");
  }
};

export async function POST() {
  const imgHash = await uploadImgsToIpfs();
  console.log("🐰Hash for Images: ", imgHash);
  const jsonHash = await uploadJSONtoIpfs(imgHash);
  console.log("🐲Hash for JSON: ", jsonHash);

  return new Response(JSON.stringify(jsonHash));
}
