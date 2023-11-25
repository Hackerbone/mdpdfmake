import { Tokens } from "Tokens";
import { pdfMakeText, getStyle } from "./text";

export const pdfMakeList = async (
  token: Tokens.List | Tokens.Generic,
  content: any[],
  push: boolean = true
) => {
  const listContent: any[] = [];

  for (const item of token.items) {
    const itemContent = [];

    // Process each token within the list item
    for (const childToken of item.tokens) {
      const listContent = await pdfMakeText(childToken, itemContent, false);
      itemContent.push(...listContent);
    }

    // Add formatted item content to the list
    listContent.push(...(itemContent.length > 0 ? itemContent : [])); // Adjust margins as needed
  }

  // Define the list format based on whether the list is ordered or unordered
  const listFormat = token.ordered ? "ol" : "ul";

  const list = {
    [listFormat]: listContent,
    margin: [0, 5, 0, 5],
  };

  // Add the formatted list to the content array if push is true
  if (push) content.push(list);
  return list;
};
