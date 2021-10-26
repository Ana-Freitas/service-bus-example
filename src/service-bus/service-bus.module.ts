import { Module } from '@nestjs/common';
import { QueueController } from './queue/queue.controller';
import { SenderQueueService } from './queue/sender/sender-queue.service';
import { ReceiverQueueService } from './queue/receiver/receiver-queue.service';
import { TopicController } from './topic/topic.controller';
import { SenderTopicService } from './topic/sender/sender-topic.service';
import { ReceiverTopicService } from './topic/receivers/receiver-topic.service';

@Module({
  imports: [],
  controllers: [QueueController, TopicController],
  providers: [
    SenderQueueService,
    ReceiverQueueService,
    SenderTopicService,
    ReceiverTopicService,
  ],
})
export class ServiceBusModule {}
