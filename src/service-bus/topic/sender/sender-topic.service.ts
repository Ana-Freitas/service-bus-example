import { Injectable } from '@nestjs/common';
import { ServiceBusProvider } from '../../config/service/service-bus.provider';

@Injectable()
export class SenderTopicService {
  constructor(private readonly sb: ServiceBusProvider) {}

  async sendMessages(topic: string, messages: any) {
    await this.sb.sendMessages(topic, messages);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
