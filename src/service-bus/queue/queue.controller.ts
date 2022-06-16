import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { ReceiverQueueService } from './receiver/receiver-queue.service';
import { SenderQueueService } from './sender/sender-queue.service';

@Controller('queue')
export class QueueController {
  constructor(
    private readonly receiverService: ReceiverQueueService,
    private senderQueueService: SenderQueueService,
    @Inject('QUEUE_NAME') private readonly queue: string,
  ) {}

  // @Get('receiver')
  // async receiver(
  //   @Body('connectionString') connectionString: string,
  //   @Body('queueName') queueName: string,
  // ) {
  //   if (!connectionString || !queueName) {
  //     throw new BadRequestException();
  //   }
  //   return await this.receiverService.receive(connectionString, queueName);
  // }

  @Post('sender')
  async sender(@Body() messages: any) {
    if (!messages) {
      throw new BadRequestException('No messages');
    }
    return await this.senderQueueService.sendMessages(this.queue, messages);
  }
}
