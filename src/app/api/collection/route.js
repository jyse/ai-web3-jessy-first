import { getCollectionImgsFPs } from "../../../../services/collection";

export async function GET(request) {
  const currentImgsFilePaths = await getCollectionImgsFPs();

  return new Response(
    JSON.stringify({
      message: "🤖✨ Image file paths you have generated so far!",
      filePaths: currentImgsFilePaths
    })
  );
}
