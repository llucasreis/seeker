import handlebars from 'handlebars';
import fs from 'fs';
import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IMailTemplateDTO from '../dtos/IMailTemplateDTO';

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    file,
    body,
    variables,
  }: IMailTemplateDTO): Promise<string> {
    if (file) {
      const templateFileContent = await fs.promises.readFile(file, {
        encoding: 'utf-8',
      });

      const parseTemplate = handlebars.compile(templateFileContent);

      return parseTemplate(variables);
    }
    return body;
  }
}
