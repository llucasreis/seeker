import { injectable, inject } from 'tsyringe';
import path from 'path';
import IMailProvider from 'src/container/providers/MailProvider/models/IMailProvider';
import isValidEmail from '@utils/isValidEmail';
import IRequestEmailDataDTO from '../dtos/IRequestEmailDataDTO';

@injectable()
export default class SendTemplateEmailService {
  constructor(@inject('MailProvider') private mailProvider: IMailProvider) {}

  public async execute(data: IRequestEmailDataDTO): Promise<void> {
    const { email } = data.to;
    if (!isValidEmail(email)) {
      console.error('E-mail adress not valid');
    }

    const templatePath = path.resolve(__dirname, '..', 'templates');
    let template = '';
    const { type } = data.template;

    switch (type) {
      case 'test': {
        template = path.join(templatePath, 'test.hbs');
        break;
      }
      default: {
        break;
      }
    }

    const {
      to,
      from,
      subject,
      template: { body, variables },
    } = data;

    await this.mailProvider.sendMail({
      to,
      from,
      subject,
      template: {
        file: template,
        body,
        variables,
      },
    });
  }
}
