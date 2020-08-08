import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IMailTemplateDTO from '../dtos/IMailTemplateDTO';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ file, body }: IMailTemplateDTO): Promise<string> {
    if (file) {
      return 'Mail Template content';
    }
    return body;
  }
}
