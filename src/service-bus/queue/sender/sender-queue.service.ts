import { Injectable } from '@nestjs/common';
import { ServiceBusClient } from '@azure/service-bus';

@Injectable()
export class SenderQueueService {
  async sendMessages(
    connectionString: string,
    queueName: string,
    messages: Array<any>,
  ) {
    const sbClient = new ServiceBusClient(connectionString);
    const sender = sbClient.createSender(queueName);

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
      console.log(`Sent a batch of messages to the queue: ${queueName}`);

      await sender.close();
      return `Sent a batch of messages to the queue: ${queueName}`;
    } finally {
      await sbClient.close();
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
