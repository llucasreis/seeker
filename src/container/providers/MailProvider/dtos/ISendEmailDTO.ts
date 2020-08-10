import IMailTemplateDTO from '../../MailTemplateProvider/dtos/IMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendEmailDTO {
  from?: IMailContact;
  to: IMailContact;
  subject: string;
  template: IMailTemplateDTO;
}
