import { Injectable } from '@nestjs/common';
import { ServiceBusProvider } from '../../config/service/service-bus.provider';

//https://docs.microsoft.com/pt-br/azure/service-bus-messaging/service-bus-nodejs-how-to-use-queues
@Injectable()
export class ReceiverTopicService {
  constructor(private readonly sb: ServiceBusProvider) {}

  async receive(topic: string, subscription: string) {
    const message = await this.sb.receiveMessage(topic, subscription);
    return message;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
