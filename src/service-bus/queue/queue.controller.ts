import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Logger,
  Post,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ReceiverQueueService } from './receiver/receiver-queue.service';
import { SenderQueueService } from './sender/sender-queue.service';

@Controller('queue')
export class QueueController {
  private readonly logger = new Logger(QueueController.name);

  constructor(
    private readonly receiverService: ReceiverQueueService,
    private senderQueueService: SenderQueueService,
    @Inject('QUEUE_NAME') private readonly queue: string,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async receiver() {
    this.logger.debug('Called when the current second is 30');
    const messages = await this.receiverService.receive(this.queue);
    this.logger.debug(JSON.stringify(messages));
  }

  @Post('sender')
  async sender(@Body() messages: any) {
    if (!messages) {
      throw new BadRequestException('No messages');
    }
    return await this.senderQueueService.sendMessages(this.queue, messages);
  }
}
