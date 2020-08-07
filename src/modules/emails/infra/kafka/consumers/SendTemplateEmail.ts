import kafka from '@infra/kafka/client';

export default class SendTemplateEmail {
  constructor() {
    this.setupConsumer();
  }

  async setupConsumer(): Promise<void> {
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
        const data = JSON.parse(message.value.toString());
        console.log('Received message!');
        console.log(data);
      },
    });

    console.log('Listening to messages!');
  }
}
