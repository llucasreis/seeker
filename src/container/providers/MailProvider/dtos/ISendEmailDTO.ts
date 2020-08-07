import IMailTemplateDTO from "../../MailTemplateProvider/dtos/IMailTemplateDTO";

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendEmailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject?: string;
  template: IMailTemplateDTO;
}
