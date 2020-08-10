import 'reflect-metadata';
import path from 'path';
import FakeMailProvider from '@container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@errors/AppError';
import SendTemplateEmailService from './SendTemplateEmailService';

let fakeMailProvider: FakeMailProvider;
let sendTemplateEmail: SendTemplateEmailService;

describe('SendTemplateEmailService', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();

    sendTemplateEmail = new SendTemplateEmailService(fakeMailProvider);
  });
  it('should be able to send mail', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await sendTemplateEmail.execute({
      to: {
        name: 'test',
        email: 'test@test.com',
      },
      subject: 'Test',
      template: {
        body: 'body test',
      },
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send email with invalid e-mail', async () => {
    await expect(
      sendTemplateEmail.execute({
        to: {
          name: 'test',
          email: 'invalid-email',
        },
        subject: 'Test',
        template: {
          body: 'body test',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to use email template of type 'example'", async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const file = path.resolve(__dirname, '..', 'templates', 'example.hbs');

    await sendTemplateEmail.execute({
      to: {
        name: 'test',
        email: 'test@test.com',
      },
      subject: 'Test',
      template: {
        type: 'example',
        body: 'body test',
      },
    });

    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({ template: expect.objectContaining({ file }) }),
    );
  });
});
