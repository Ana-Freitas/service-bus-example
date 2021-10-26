import { Controller, Get, Post } from '@nestjs/common';
import { ReceiverQueueService } from './receiver/receiver-queue.service';
import { SenderQueueService } from './sender/sender-queue.service';

@Controller('queue')
export class QueueController {
  constructor(
    private readonly receiverService: ReceiverQueueService,
    private senderQueueService: SenderQueueService,
  ) {}

  @Get()
  getHello(): string {
    return this.receiverService.getHello();
  }

  @Get('receiver')
  async receiver() {
    return await this.receiverService.receive();
  }

  @Post('sender')
  async sender() {
    return await this.senderQueueService.sendMessages();
  }
}
