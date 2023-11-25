# mdpdfmake (Convert Markdown to pdfmake easily)

This project is a converter that takes Markdown input and converts it into a format that can be used with the PDFMake library. This allows you to easily create PDF documents from your Markdown files.

### Features
- Headers: Supports all levels of Markdown headers.
- Lists: Supports both ordered and unordered lists.
- Links: Converts Markdown links into clickable links in the PDF.
- Images: Converts Markdown image syntax into images in the PDF.
- Text Styling: Supports bold, italic, strikethrough, and underline text styles.
- Complex Markdown: Supports complex Markdown syntax such as nested bold/italic text, and nested blockquote paragraphs.


### To-Do
- Codeblocks Support: Add support for converting Markdown codeblocks into formatted text in the PDF.
- Blockquote Background Color: Add support for changing the background color of blockquotes in the PDF.
- Table Support: Add support for converting Markdown tables into tables in the PDF.
Nested Lists: Improve support for nested lists in the Markdown to PDF conversion.

### Usage
To use this converter, simply import the module and call the convert function with your Markdown text as the argument. The function will return a PDFMake document definition that you can use to create your PDF.

```ts
const converter = require('markdown-to-pdfmake');
const pdfMake = require('pdfmake');

let markdownText = '# Hello, world!';
let docDefinition = converter.convert(markdownText);

pdfMake.createPdf(docDefinition).download();
```

### Contributing
Contributions to this project are welcome! If you're interested in adding a feature or fixing a bug, please open a new issue or pull request.
