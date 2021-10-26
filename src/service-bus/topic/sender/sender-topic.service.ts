import { ServiceBusClient } from '@azure/service-bus';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SenderTopicService {
  async sendMessages(
    connectionString: string,
    topicName: string,
    messages: Array<any>,
  ) {
    const sbClient = new ServiceBusClient(connectionString);
    const sender = sbClient.createSender(topicName);

    try {
      let batch = await sender.createMessageBatch();

      for (let i = 0; i < messages.length; i++) {
        if (!batch.tryAddMessage(messages[i])) {
          await sender.sendMessages(batch);
          batch = await sender.createMessageBatch();

          if (!batch.tryAddMessage(messages[i])) {
            throw new Error('Message too big to fit in a batch');
          }
        }
      }

      await sender.sendMessages(batch);
      console.log(`Sent a batch of messages to the topic: ${topicName}`);

      await sender.close();
      return `Sent a batch of messages to the topic: ${topicName}`;
    } finally {
      await sbClient.close();
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
