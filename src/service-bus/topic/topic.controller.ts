import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Post,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ReceiverTopicService } from './receivers/receiver-topic.service';
import { SenderTopicService } from './sender/sender-topic.service';

@Controller('topic')
export class TopicController {
  private readonly logger = new Logger(TopicController.name);

  constructor(
    private senderService: SenderTopicService,
    private receiverService: ReceiverTopicService,
    @Inject('TOPIC_NAME') private readonly topic: string,
    @Inject('SUBSCRIPTION') private readonly subscription: string,
  ) {}

  @Get()
  getHello(): string {
    return this.senderService.getHello();
  }

  @Post('sender')
  async sender(@Body() messages: any) {
    if (!messages) {
      throw new BadRequestException('No messages');
    }
    return await this.senderService.sendMessages(this.topic, messages);
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async receiver() {
    this.logger.debug('Called when the current second is 30');
    const messages = await this.receiverService.receive(
      this.topic,
      this.subscription,
    );
    this.logger.debug(JSON.stringify(messages));
  }
}
