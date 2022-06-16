import { Injectable } from '@nestjs/common';
import { ServiceBusProvider } from 'src/service-bus/config/service/service-bus.provider';

@Injectable()
export class SenderQueueService {
  constructor(private readonly sb: ServiceBusProvider) {}

  async sendMessages(queueName: string, messages: any) {
    await this.sb.sendMessages(queueName, messages);
  }
}
