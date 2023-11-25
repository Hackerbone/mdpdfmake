// Markdown Tokenizer
import { lexer } from "marked";

// Types
import { TDocumentDefinitions } from "pdfmake/interfaces";

// PdfMake
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Utils
import { pdfMakeImage } from "./utils/image";
import { pdfMakeParagraph } from "./utils/paragraph";
import { pdfMakeHeading } from "./utils/heading";
import { pdfMakeList } from "./utils/list";
import { pdfMakeBlockquote } from "./utils/blockquote";

import fs from "fs";

// Configure pdfMake to use the fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
};
export async function markdownToPdfmake(
  markdown: string
): Promise<TDocumentDefinitions> {
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

const md = // markdown string from example/test.md
  fs.readFileSync("./example/test.md", { encoding: "utf-8" });

const PrintPdf = async (docDefinition: TDocumentDefinitions) => {
  try {
    console.log("Generating PDF...");
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    console.dir(docDefinition.content, { depth: null });

    pdfDocGenerator.getBase64((encodedString) => {
      const pdfBuffer = Buffer.from(encodedString, "base64");
      require("fs").writeFileSync(`./example/render.pdf`, pdfBuffer);
      console.log("PDF Generated");
    });
  } catch (error) {
    console.error(error);
  }
};

markdownToPdfmake(md).then((pdfDefinition) => {
  PrintPdf(pdfDefinition);
});
