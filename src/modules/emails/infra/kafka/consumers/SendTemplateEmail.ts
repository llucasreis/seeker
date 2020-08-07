import { container } from 'tsyringe';
import kafka from '@infra/kafka/client';
import SendTemplateEmailService from '@modules/emails/services/SendTemplateEmailService';
import IRequestEmailDataDTO from '@modules/emails/dtos/IRequestEmailDataDTO';

export default class SendTemplateEmail {
  constructor() {
    this.setupConsumer();
  }

  async setupConsumer(): Promise<void> {
    const sendTemplateEmailService = container.resolve(
      SendTemplateEmailService,
    );

    const consumer = kafka.consumer({
      groupId: 'seeker',
    });

    await consumer.connect();
    await consumer.subscribe({
      topic: 'seeker.send-template-email',
      fromBeginning: true,
    });

    await consumer.run({
      async eachMessage({ message }) {
        const data: IRequestEmailDataDTO = JSON.parse(message.value.toString());

        await sendTemplateEmailService.execute(data);
      },
    });

    console.log('Listening to messages!');
  }
}
