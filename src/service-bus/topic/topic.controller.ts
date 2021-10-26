import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ReceiverTopicService } from './receivers/receiver-topic.service';
import { SenderTopicService } from './sender/sender-topic.service';

@Controller('topic')
export class TopicController {
  constructor(
    private senderService: SenderTopicService,
    private receiverService: ReceiverTopicService,
  ) {}

  @Get()
  getHello(): string {
    return this.senderService.getHello();
  }

  @Post('sender')
  async send(
    @Body('connectionString') connectionString: string,
    @Body('topicName') topicName: string,
    @Body('messages') messages: Array<any>,
  ) {
    if (!connectionString || !topicName || !messages) {
      throw new BadRequestException();
    }
    return await this.senderService.sendMessages(
      connectionString,
      topicName,
      messages,
    );
  }

  @Get('receiver')
  async receive(
    @Body('connectionString') connectionString: string,
    @Body('topicName') topicName: string,
    @Body('subscription') subscriptionName,
  ) {
    if (!connectionString || !topicName || !subscriptionName) {
      throw new BadRequestException();
    }
    return await this.receiverService.receive(
      connectionString,
      topicName,
      subscriptionName,
    );
  }
}
