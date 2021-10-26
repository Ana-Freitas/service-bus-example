import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
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
  async receiver(
    @Body('connectionString') connectionString: string,
    @Body('queueName') queueName: string,
  ) {
    if (!connectionString || !queueName) {
      throw new BadRequestException();
    }
    return await this.receiverService.receive(connectionString, queueName);
  }

  @Post('sender')
  async sender(
    @Body('connectionString') connectionString: string,
    @Body('queueName') queueName: string,
    @Body('messages') messages: Array<any>,
  ) {
    if (!connectionString || !queueName || !messages) {
      throw new BadRequestException();
    }
    return await this.senderQueueService.sendMessages(
      connectionString,
      queueName,
      messages,
    );
  }
}
