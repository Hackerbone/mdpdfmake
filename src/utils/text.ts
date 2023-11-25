import { Tokens } from "Tokens";
import { pdfMakeCodeblock } from "./codeblock";

export const pdfMakeText = async (
  token: Tokens.Text | Tokens.Generic,
  content: any[],
  push: boolean = true
) => {
  if (token?.tokens && token?.tokens.length > 0) {
    // Initialize an array to hold the text fragments
    const textFragments: any[] = [];

    for (const childToken of token.tokens) {
      let fragment: any;
      switch (childToken.type) {
        case "strong":
        case "em":
        case "codespan":
        case "del":
        case "link": {
          fragment = {
            text: childToken.text,
            ...getStyle(childToken.type),
          };

          if (childToken.type === "link") {
            fragment.link = childToken.href;
          }

          textFragments.push(fragment);
          break;
        }
        case "code": {
          const codeContent = await pdfMakeCodeblock(childToken, [], false);
          textFragments.push(codeContent);
          break;
        }
        case "text": {
          const textRecContent = await pdfMakeText(childToken, [], false);
          textFragments.push(...textRecContent.map((f: any) => f.text)); // Flatten the text fragments
          break;
        }
        default:
          console.warn(`Unhandled token type: ${childToken.type}`);
          fragment = { text: childToken.raw };
          textFragments.push(fragment);
      }
    }

    const combinedText = {
      text: textFragments,
      margin: [0, 5, 0, 5],
    };

    if (push) content.push(combinedText);
    return [combinedText];
  } else {
    const textFragments: any[] = [];
    let fragment: any;
    switch (token.type) {
      case "strong":
      case "em":
      case "codespan":
      case "del":
      case "link":
        fragment = {
          text: token.text,
          ...getStyle(token.type),
        };

        if (token.type === "link") {
          fragment.link = token.href;
        }

        textFragments.push(fragment);
        break;
      case "text":
        fragment = { text: token.raw };
        textFragments.push(fragment);
        break;
      case "code": {
        const codeContent = await pdfMakeCodeblock(token, [], false);
        textFragments.push(codeContent);
        break;
      }
      default:
        console.warn(`Unhandled token type: ${token.type}`);
        fragment = { text: token.raw };
        textFragments.push(fragment);
    }

    if (push) content.push(fragment);
    return textFragments;
  }
};

// Helper function to get text style based on token type
export function getStyle(type: string) {
  switch (type) {
    case "strong":
      return { bold: true };
    case "em":
      return { italics: true };
    case "codespan":
      return {
        background: "#f0f0f0",
        fontSize: 10,
        margin: [0, 5, 0, 5],
      };
    case "del":
      return { decoration: "lineThrough" };
    case "link":
      return { color: "blue", decoration: "underline" };
    case "code":
      return {
        fontSize: 10, // Smaller font size for code
        color: "#333333", // Darker text color
        preserveLeadingSpaces: true, // Preserve indentation
        lineHeight: 1.2, // Adjust line height for better readability
      };
    default:
      return {};
  }
}
