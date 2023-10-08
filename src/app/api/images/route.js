import { NextResponse } from "next/server";
import fs from "fs";
import {
  getImgsFilePaths,
  getAmountGenImages
} from "../../../../services/images";

/* *************************************************************************
                                DreamStudio API
**************************************************************************** */

// wednesday 4 october: also add preset functionality in here
// look up the sizes of the images

export async function POST(request) {
  const path =
    "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

  const headers = {
    Accept: "application/json",
    Authorization: "Bearer sk-FXFbM5LnYaDjT0Gl89xi1qo3Bx8RvnDKiBXpQQzG58mQleKA",
    "Content-Type": "application/json"
  };

  const { prompt, style } = await request.json();

  const body = {
    steps: 40,
    width: 1024,
    height: 1024,
    seed: 0,
    cfg_scale: 5,
    samples: 4,
    style_preset: style,
    text_prompts: [
      {
        text: prompt,
        weight: 1
      },
      {
        text: "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime:1.4), text, close up, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck",
        weight: -1
      }
    ]
  };

  const response = await fetch(path, {
    headers,
    method: "POST",
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorResponse = await response.text();
    console.error(`Error response: ${errorResponse}`);
    throw new Error(`Non-200 response: ${errorResponse}`);
  }

  const responseJSON = await response.json();

  const currentImgsFilePaths = await getImgsFilePaths();
  const amountCurrentImages = currentImgsFilePaths.length + 1;

  const writePromises = responseJSON.artifacts.map(async (image, index) => {
    let imageIndex = amountCurrentImages + index;
    await fs.promises.writeFile(
      `./public/output/genImgs/${imageIndex}.png`,
      Buffer.from(image.base64, "base64")
    );
  });

  await Promise.all(writePromises);
  const newImgsFilePaths = await getImgsFilePaths();

  return new Response(
    JSON.stringify({
      message: "🔥🚀 Filepaths with the BRAND NEW generated Images!✨",
      filePaths: newImgsFilePaths
    })
  );
}

export async function GET(request) {
  const currentImgsFilePaths = await getImgsFilePaths();

  return new Response(
    JSON.stringify({
      message: "🤖✨ Image file paths you have generated so far!",
      filePaths: currentImgsFilePaths
    })
  );
}
