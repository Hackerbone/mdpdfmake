declare module "mdpdfmake" {
  import { TDocumentDefinitions } from "pdfmake/interfaces";

  function mdpdfmake(markdown: string): Promise<TDocumentDefinitions>;

  export default mdpdfmake;
}
