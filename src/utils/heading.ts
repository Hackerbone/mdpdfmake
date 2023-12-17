import { Tokens } from "Tokens";
import { globalOptions } from "../index";

export const pdfMakeHeading = (
  token: Tokens.Heading | Tokens.Generic,
  content: any[],
  push: boolean = true
) => {
  const fontSize = globalOptions.headingFontSizes[token.depth - 1];
  const bold = true;
  const margin = [0, 5, 0, 5];
  const style = {};

  if (token.depth === 1 || token.depth === 2) {
    if (globalOptions.headingUnderline) style["decoration"] = "underline";
    margin[1] = 10;
    margin[3] = 10;
  }

  if (push) {
    content.push({
      text: token.text,
      fontSize,
      bold,
      margin,
      style,
    });
  }

  return {
    text: token.text,
    fontSize,
    bold,
    margin,
    style,
  };
};
