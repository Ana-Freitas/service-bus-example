import { ServiceBusClient } from '@azure/service-bus';
import { Inject } from '@nestjs/common';

export class ServiceBusProvider {
  private serviceBus: ServiceBusClient;

  constructor(@Inject('CONNECTION') private readonly connection: string) {
    this.serviceBus = new ServiceBusClient(connection);
  }

  async sendMessages(queueOrTopicName: string, messages: any) {
    const sender = this.serviceBus.createSender(queueOrTopicName);
    await sender.sendMessages({
      body: messages,
    });
  }

  async receiveMessage(queueOrTopicName: string, subscription?: string) {
    const receiver = this.serviceBus.createReceiver(
      queueOrTopicName,
      subscription,
      {
        receiveMode: 'peekLock',
      },
    );

    const received = await receiver.receiveMessages(1);
    const messages = [];

    for (const message of received) {
      messages.push(message.body);
      receiver.completeMessage(message);
    }

    return messages;
  }
}
