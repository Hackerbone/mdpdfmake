declare module "mdpdfmake" {
  import { TDocumentDefinitions } from "pdfmake/interfaces";

  function mdpdfmake(
    markdown: string,
    options?: MOptions
  ): Promise<TDocumentDefinitions>;

  export { mdpdfmake };
}

interface MOptions {
  headingFontSizes: number[];
  headingUnderline?: boolean;
}
