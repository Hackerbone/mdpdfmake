import { Tokens } from "Tokens";
import { getStyle } from "./text";

export const pdfMakeCodeblock = async (
  token: Tokens.Code | Tokens.Generic,
  content: any[],
  push: boolean = true
) => {
  // Define the style for the code text
  const codeTextStyle = getStyle("code");

  const codeText = {
    columns: [
      {
        width: "90%",
        text: token.text,
        ...codeTextStyle,
        margin: [5, 5, 5, 5], // Adjust margin as needed
      },
    ],
  };

  // Highlight the language name (if available)
  let languageHeader = {};
  if (token.lang) {
    languageHeader = {
      text: token.lang,
      color: "#004252", // Highlight color for the language
      fontSize: 8,
      bold: true,
      margin: [0, 5, 0, 2], // Adjust margin as needed
    };
  }

  // Define the structure of the codeblock with optional language header
  const codeblockStructure = {
    stack: [
      languageHeader,
      {
        table: {
          widths: ["*"], // Ensure the table uses the full available width
          body: [[codeText]],
        },
        layout: {
          hLineColor: () => "#dddddd",
          vLineColor: () => "#dddddd",
          paddingLeft: () => 0,
          paddingRight: () => 0,
          paddingTop: () => 0,
          paddingBottom: () => 0,
        },
      },
    ],
    margin: [0, 5, 0, 5],
  };

  if (push) {
    content.push(codeblockStructure);
  }

  return codeblockStructure;
};
