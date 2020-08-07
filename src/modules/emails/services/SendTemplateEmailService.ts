import { injectable, inject } from 'tsyringe';
import path from 'path';
import IMailProvider from 'src/container/providers/MailProvider/models/IMailProvider';
import isValidEmail from '@utils/isValidEmail';
import IRequestEmailDataDTO from '../dtos/IRequestEmailDataDTO';

@injectable()
export default class SendTemplateEmailService {
  constructor(@inject('MailProvider') private mailProvider: IMailProvider) {}

  public async execute({
    to,
    from,
    subject,
    template,
  }: IRequestEmailDataDTO): Promise<void> {
    if (!isValidEmail(to.email)) {
      console.error('E-mail adress not valid');
      return;
    }

    const templateFolderPath = path.resolve(__dirname, '..', 'templates');
    const { type, body, variables } = template;

    let templatePath = '';

    switch (type) {
      case 'test': {
        templatePath = path.join(templateFolderPath, 'test.hbs');
        break;
      }
      default: {
        break;
      }
    }

    await this.mailProvider.sendMail({
      to,
      from,
      subject,
      template: {
        file: templatePath,
        body,
        variables,
      },
    });
  }
}
