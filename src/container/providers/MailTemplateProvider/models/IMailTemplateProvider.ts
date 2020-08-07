import IMailTemplateDTO from '../dtos/IMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IMailTemplateDTO): Promise<string>;
}
