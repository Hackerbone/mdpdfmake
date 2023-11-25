import { Tokens } from "Tokens";
import { pdfMakeParagraph } from "./paragraph";
import { pdfMakeText } from "./text";
import { pdfMakeCodeblock } from "./codeblock";

export const pdfMakeBlockquote = async (
  token: Tokens.Blockquote | Tokens.Generic,
  content: any[],
  push: boolean = true
) => {
  const blockquoteContent: any[] = [];

  const handleToken = async (
    nestedToken:
      | Tokens.Paragraph
      | Tokens.Link
      | Tokens.Strong
      | Tokens.Em
      | Tokens.Del
      | Tokens.Code
      | Tokens.Text
      | Tokens.Generic
  ) => {
    switch (nestedToken.type) {
      case "paragraph": {
        const pcontent = await pdfMakeParagraph(nestedToken, [], false);

        content.push({
          ...pcontent,
          italics: true,
          margin: [0, 5, 0, 5],
          background: "#eae7f2", // a light purple highlight
        });
        break;
      }
      case "strong":
      case "em":
      case "codespan":
      case "del":
      case "link":
      case "text": {
        const textRecContent = await pdfMakeText(nestedToken, [], false);
        blockquoteContent.push(...textRecContent);
        break;
      }
      case "code": {
        const codeContent = await pdfMakeCodeblock(nestedToken, [], false);
        blockquoteContent.push(codeContent);
        break;
      }
      default:
        blockquoteContent.push({ text: nestedToken.text });
    }
  };

  for (const nestedToken of token.tokens) {
    await handleToken(nestedToken);
  }

  const blockquoteFormat = {
    text: blockquoteContent,
  };

  if (push) {
    content.push(blockquoteFormat);
  }

  return blockquoteFormat;
};
