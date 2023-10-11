import fs from "fs";
import { readFile } from "fs/promises";
import { join } from "path";
import { getCollectionImgsFPs } from "../../../../services/collection";

async function getImageBase64(imgFp) {
  const fullImagePath = join(process.cwd(), "public", imgFp);
  try {
    const imageBuffer = await readFile(fullImagePath);
    const base64Data = imageBuffer.toString("base64");
    return base64Data;
  } catch (error) {
    console.error(`Error reading image file: ${error.message}`);
    return null;
  }
}

const addImageToCollection = async (imgFp) => {
  const jsonFilePath = join(process.cwd(), "public", "JSON", "genImgs.json");
  const collectionFilePath = join(
    process.cwd(),
    "public",
    "JSON",
    "collection.json"
  );

  try {
    const jsonContent = await readFile(jsonFilePath, "utf-8");
    const jsonData = JSON.parse(jsonContent);

    const promptDetails = jsonData.find((promptObj) =>
      promptObj.images.includes(imgFp)
    );

    if (promptDetails) {
      const collectionContent = await readFile(collectionFilePath, "utf-8");
      const collectionData = JSON.parse(collectionContent);

      const addedImgObj = {
        prompt: promptDetails.prompt,
        imageFile: imgFp
      };

      collectionData.push(addedImgObj);
      fs.writeFileSync(collectionFilePath, JSON.stringify(collectionData));

      const currentImgsFilePaths = await getCollectionImgsFPs();
      const amountCurrentImages = currentImgsFilePaths.length + 1;

      let imageIndex = amountCurrentImages + 1;
      let imageFilePath = `./public/frontmania-collection/${imageIndex}.png`;

      const base64Image = await getImageBase64(imgFp);

      await fs.promises.writeFile(
        imageFilePath,
        Buffer.from(base64Image, "base64")
      );

      return { success: true, message: "💥✨Image added to the collection." };
    } else {
      return {
        success: false,
        message: "👹! Image already exists in the collection."
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while processing the request."
    };
  }
};

export async function GET() {
  const jsonFilePath = join(process.cwd(), "public", "JSON", "genImgs.json");
  const jsonContent = await readFile(jsonFilePath, "utf-8");
  const jsonData = JSON.parse(jsonContent);

  return new Response(
    JSON.stringify({
      data: jsonData
    })
  );
}

export async function POST(request) {
  const { addedImgFp } = await request.json();
  const result = await addImageToCollection(addedImgFp);

  if (result.succes) {
    console.log("🐲🥷✅✨ Image added");
  } else {
    console.error("An error occurred while adding an image");
  }

  return new Response(JSON.stringify(result));
}
