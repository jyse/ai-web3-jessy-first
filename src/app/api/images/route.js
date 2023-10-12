import fs from "fs";
import { readFile } from "fs/promises";
import { join } from "path";
import { getGenImgsFilePaths } from "../../../../services/images";

export async function POST(request) {
  const path =
    "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

  const headers = {
    Accept: "application/json",
    Authorization: "Bearer sk-FXFbM5LnYaDjT0Gl89xi1qo3Bx8RvnDKiBXpQQzG58mQleKA",
    "Content-Type": "application/json",
  };

  const { prompt } = await request.json();
  console.log("🔥🚀🎨 Sending prompt to DreamStudio API");

  const body = {
    steps: 40,
    width: 1024,
    height: 1024,
    seed: 0,
    cfg_scale: 5,
    samples: 4,
    text_prompts: [
      {
        text: prompt,
        weight: 1,
      },
      {
        text: "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime:1.4), text, close up, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck",
        weight: -1,
      },
    ],
  };

  const response = await fetch(path, {
    headers,
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorResponse = await response.text();
    console.error(`Error response: ${errorResponse}`);
    throw new Error(`Non-200 response: ${errorResponse}`);
  }

  const responseJSON = await response.json();

  const getFileIdentifier = () => {
    const randomFraction = Math.random();
    const randomNumber = Math.floor(randomFraction * 501);
    return randomNumber;
  };

  const identifier = getFileIdentifier();

  const currentImgsFilePaths = await getGenImgsFilePaths();
  const amountCurrentImages = currentImgsFilePaths.length + 1;

  const writeImages = responseJSON.artifacts.map(async (image, index) => {
    let imageIndex = amountCurrentImages + index;
    let imageFilePath = `./public/output/genImgs/${imageIndex}.png`;

    await fs.promises.writeFile(
      imageFilePath,
      Buffer.from(image.base64, "base64")
    );
  });

  console.log("📝 Writing 🎨 AI art to the folder");

  let imageObject = {
    tokenId: "",
    prompt: prompt,
    style: "Art",
    bookmarked: false,
    images: [],
  };

  const writeJSON = responseJSON.artifacts.map(async (image, index) => {
    let imageIndex = amountCurrentImages + index;
    let imageFilePath = `/output/genImgs/${imageIndex}.png`;
    imageObject.tokenId = image.seed;
    imageObject.images.push(imageFilePath);
  });

  const jsonFilePath = join(process.cwd(), "public", "JSON", "genImgs.json");
  const jsonContent = await readFile(jsonFilePath, "utf-8");
  const jsonData = JSON.parse(jsonContent);

  jsonData.push(imageObject);

  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData));

  await Promise.all(writeImages, writeJSON);
  const newImgsFilePaths = await getGenImgsFilePaths();

  return new Response(
    JSON.stringify({
      message: "🔥🚀 Filepaths with the BRAND NEW generated Images!✨",
      filePaths: newImgsFilePaths,
    })
  );
}

export async function GET(request) {
  const currentImgsFilePaths = await getGenImgsFilePaths();

  return new Response(
    JSON.stringify({
      message: "🤖✨ Image file paths you have generated so far!",
      filePaths: currentImgsFilePaths,
    })
  );
}
