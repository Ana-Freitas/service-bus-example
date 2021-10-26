import { Module } from '@nestjs/common';
import { QueueController } from './queue/queue.controller';
import { SenderQueueService } from './queue/sender/sender-queue.service';
import { ReceiverQueueService } from './queue/receiver/receiver-queue.service';

@Module({
  imports: [],
  controllers: [QueueController],
  providers: [SenderQueueService, ReceiverQueueService],
})
export class ServiceBusModule {}
