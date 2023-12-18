import { Tokens } from "Tokens";
import axios from "axios";
import imageToBase64 from "image-to-base64";

export const pdfMakeImage = async (
  token: Tokens.Image | Tokens.Generic,
  content: any[],
  push: boolean = true
) => {
  try {
    await axios.head(token.href);
    const base64Image = await imageToBase64(token.href);

    // get extension from href
    const extension = token.href.split(".").pop();

    let dataUrl = "";

    if (["jpg", "jpeg", "png"].includes(extension))
      dataUrl = `data:image/${extension};base64,` + base64Image;
    else if (extension === "svg")
      dataUrl = `data:image/svg+xml;base64,` + base64Image;
    else if (extension === "gif")
      dataUrl = `data:image/gif;base64,` + base64Image;
    else dataUrl = `data:image/png;base64,` + base64Image;

    if (push)
      content.push({ image: dataUrl, width: 150, margin: [0, 5, 0, 5] });

    return { image: dataUrl, width: 150, margin: [0, 5, 0, 5] };
  } catch (err) {
    console.warn("Image not found: " + token.href, ", reverting to text.");
    return {
      text: `[Image: ${token.href}]`,
      link: token.href,
      color: "blue",
      decoration: "underline",
    };
  }
};
