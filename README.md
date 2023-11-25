# mdpdfmake (Convert Markdown to pdfmake easily)

Finding a converter that can convert Markdown to PDFMake can be difficult. This package aims to solve that problem by providing a simple function that takes Markdown input (string) and converts it into a format that can be used with the PDFMake library. 

This allows you to easily create PDF documents from your Markdown files.

### Features
- `Headers`: Supports all levels of Markdown headers.
- `Lists`: Supports both ordered and unordered lists.
- `Links`: Converts Markdown links into clickable links in the PDF.
- `Images`: Converts Markdown image syntax into images in the PDF.
- `Text Styling`: Supports bold, italic, strikethrough, and underline text styles.
- `Complex Markdown`: Supports complex Markdown syntax such as nested bold/italic text, and nested blockquote paragraphs.

### Installation

Simply use npm to install this package

```bash
npm install mdpdfmake
```

### Usage
To use this converter, simply import the module and call the convert function with your Markdown text as the argument. The function will return a PDFMake document definition that you can use to create your PDF.

```ts
import mdpdfmake from 'mdpdfmake';

const markdown = `# Heading
This is a paragraph with **bold** text and *italic* text.

- List Item 1
- List Item 2

> Blockquote

![Image](https://cdn.pixabay.com/photo/2018/01/23/23/53/rick-and-morty-3102795_1280.jpg)`;

mdpdfmake(markdown).then(docDefinition => {
    // Use docDefinition with a PDFMake instance to generate a PDF
});
```

> Note: The response from the convert function is a Promise, so you will need to use async/await or .then() to get the result.


### API Reference

`mdpdfmake(markdown: string): Promise<TDocumentDefinitions>` - Converts the given Markdown string into a PDFMake document definition.

#### Parameters:

- `markdown` (string): The Markdown content to convert.


### Upcoming Features
- `Table Support`: Add support for converting Markdown tables into tables in the PDF.



### Contributing
Contributions to this project are welcome! If you're interested in adding a feature or fixing a bug, please open a new issue or pull request.


### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.