import { Tokens } from "Tokens";
import { pdfMakeImage } from "./image";
import { pdfMakeText } from "./text";

export const pdfMakeParagraph = async (
  token: Tokens.Paragraph | Tokens.Generic,
  content: any[],
  push: boolean = true
) => {
  if (token.tokens && token.tokens.length > 0) {
    let inlineElements: any[] = [];

    for (const childToken of token.tokens) {
      switch (childToken.type) {
        case "image":
          // If there are inline elements before the image, push them as a paragraph
          if (inlineElements.length > 0) {
            content.push({
              text: inlineElements,
              margin: [0, 5, 0, 5],
            });
            inlineElements = []; // Reset inline elements
          }

          // Process and push the image as a separate block
          const imageFragment = await pdfMakeImage(childToken, [], false);
          content.push(imageFragment);
          break;
        case "strong":
        case "em":
        case "codespan":
        case "del":
        case "link":
        case "code":
          // delete tokens array from childToken
          const fixedChildTokens: any = childToken;
          delete fixedChildTokens.tokens;
          const textRecContent = await pdfMakeText(fixedChildTokens, [], false);
          inlineElements.push(...textRecContent);
          break;
        case "text":
          // delete tokens array from childToken
          const textRecContentText = await pdfMakeText(childToken, [], false);
          inlineElements.push(...textRecContentText);
          break;
        default:
          console.warn(`Unhandled token type: ${childToken.type}`);
          inlineElements.push({ text: childToken.raw });
      }
    }

    // Push remaining inline elements after the last image (if any)
    if (inlineElements.length > 0) {
      content.push({
        text: inlineElements,
        margin: [0, 5, 0, 5],
      });
    }

    // If 'push' is false, return the last paragraph or image
    if (!push) {
      return content[content.length - 1];
    }
  } else {
    const simpleParagraph = { text: token.text, margin: [0, 5, 0, 5] };
    if (push) content.push(simpleParagraph);
    return simpleParagraph;
  }
};
