import { Tokens } from "Tokens";

export const pdfMakeHR = async (
  token: Tokens.Hr | Tokens.Generic,
  content: any[],
  push: boolean = true
) => {
  // Define the horizontal rule structure
  const horizontalRule = {
    canvas: [
      {
        type: "line",
        x1: 0,
        y1: 5,
        x2: 515, // Width of the line
        y2: 5,
        lineWidth: 1, // Thickness of the line
        lineColor: "#2c2c2c", // Color of the line
      },
    ],
    margin: [0, 10, 0, 10], // Margin around the HR (top, right, bottom, left)
  };

  if (push) {
    content.push(horizontalRule);
  }

  return horizontalRule;
};
