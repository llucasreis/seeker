interface ITemplateData {
  [key: string]: string | number;
}

export default interface IMailTemplateDTO {
  file: string;
  body?: string;
  variables?: ITemplateData;
}
