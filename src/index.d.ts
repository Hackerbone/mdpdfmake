declare module "mdpdfmake" {
  import { TDocumentDefinitions } from "pdfmake/interfaces";
  import { MOptions } from "./index";

  function mdpdfmake(
    markdown: string,
    options?: MOptions
  ): Promise<TDocumentDefinitions>;

  export default mdpdfmake;
}
