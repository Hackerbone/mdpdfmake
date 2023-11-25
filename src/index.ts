// Markdown Tokenizer
import { lexer } from "marked";

// Types
import { TDocumentDefinitions } from "pdfmake/interfaces";

// Utils
import { pdfMakeImage } from "./utils/image";
import { pdfMakeParagraph } from "./utils/paragraph";
import { pdfMakeHeading } from "./utils/heading";
import { pdfMakeList } from "./utils/list";
import { pdfMakeBlockquote } from "./utils/blockquote";
import { pdfMakeCodeblock } from "./utils/codeblock";
import { pdfMakeHR } from "./utils/hr";

async function mdpdfmake(markdown: string): Promise<TDocumentDefinitions> {
  const tokens = lexer(markdown);
  const content: any[] = [];

  for (const token of tokens) {
    switch (token.type) {
      case "paragraph":
        await pdfMakeParagraph(token, content);
        break;

      case "heading":
        pdfMakeHeading(token, content);
        break;

      case "list":
        await pdfMakeList(token, content);
        break;

      case "blockquote":
        await pdfMakeBlockquote(token, content);
        break;

      case "image":
        await pdfMakeImage(token, content);
        break;

      case "code":
        await pdfMakeCodeblock(token, content);
        break;

      case "hr":
        await pdfMakeHR(token, content);
        break;

      case "space":
        break;

      default:
        console.warn(`Unhandled token type: ${token.type}`);
    }
  }

  return {
    content: content,
    defaultStyle: {
      font: "Roboto",
    },
  };
}

export { mdpdfmake };
