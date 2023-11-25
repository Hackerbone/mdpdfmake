import { Tokens } from "Tokens";
import imageToBase64 from "image-to-base64";
import fs from "fs";

export const pdfMakeImage = async (
  token: Tokens.Image | Tokens.Generic,
  content: any[],
  push: boolean = true
) => {
  const base64Image = await imageToBase64(token.href);

  // get extension from href
  let extension = token.href.split(".").pop();

  let dataUrl = "";

  if (["jpg", "jpeg", "png"].includes(extension))
    dataUrl = `data:image/${extension};base64,` + base64Image;
  else if (extension === "svg")
    dataUrl = `data:image/svg+xml;base64,` + base64Image;
  else if (extension === "gif")
    dataUrl = `data:image/gif;base64,` + base64Image;
  else dataUrl = `data:image/png;base64,` + base64Image;

  // write image to file
  fs.writeFile(
    `./${token.href}.${extension}`,
    dataUrl,
    { encoding: "base64" },
    function (err) {
      console.log("File created");
    }
  );

  if (push) content.push({ image: dataUrl, width: 150, margin: [0, 5, 0, 5] });

  return { image: dataUrl, width: 150, margin: [0, 5, 0, 5] };
};
