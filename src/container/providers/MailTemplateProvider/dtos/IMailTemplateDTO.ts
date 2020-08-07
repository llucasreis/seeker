interface ITemplateData{
  [key: string]: string | number;
}

export default interface IMailTemplateDTO {
  type?: string;
  body?: string;
  data?: ITemplateData;
}
