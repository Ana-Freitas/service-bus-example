import { Injectable } from '@nestjs/common';
import { ServiceBusProvider } from 'src/service-bus/config/service/service-bus.provider';
@Injectable()
export class ReceiverQueueService {
  constructor(private readonly sb: ServiceBusProvider) {}

  async receive(queueName: string) {
    const message = await this.sb.receiveMessage(queueName);
    return message;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
