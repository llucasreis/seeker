interface ITemplateData {
  [key: string]: string | number;
}

interface IMailTemplateData {
  type: 'test';
  body?: string;
  variables?: ITemplateData;
}

interface IMailContact {
  name: string;
  email: string;
}

export default interface IRequestEmailDataDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  template: IMailTemplateData;
}
