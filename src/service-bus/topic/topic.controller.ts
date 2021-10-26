import { Controller, Get, Post } from '@nestjs/common';
import { Receiver1TopicService } from './receivers/receiver1-topic.service';
import { Receiver2TopicService } from './receivers/receiver2-topic.service';
import { SenderTopicService } from './sender/sender-topic.service';

@Controller('topic')
export class TopicController {
  constructor(
    private senderService: SenderTopicService,
    private receiver1Service: Receiver1TopicService,
    private receiver2Service: Receiver2TopicService,
  ) {}

  @Get()
  getHello(): string {
    return this.senderService.getHello();
  }

  @Post('sender')
  async send() {
    return await this.senderService.sendMessages();
  }

  @Get('receiver1')
  async receive1() {
    return await this.receiver1Service.receive();
  }

  @Get('receiver2')
  async receive2() {
    return await this.receiver2Service.receive();
  }
}
