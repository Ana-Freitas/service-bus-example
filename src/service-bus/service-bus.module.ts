import { Module } from '@nestjs/common';
import { QueueController } from './queue/queue.controller';
import { SenderQueueService } from './queue/sender/sender-queue.service';
import { ReceiverQueueService } from './queue/receiver/receiver-queue.service';
import { TopicController } from './topic/topic.controller';
import { SenderTopicService } from './topic/sender/sender-topic.service';
import { Receiver1TopicService } from './topic/receivers/receiver1-topic.service';
import { Receiver2TopicService } from './topic/receivers/receiver2-topic.service';

@Module({
  imports: [],
  controllers: [QueueController, TopicController],
  providers: [
    SenderQueueService,
    ReceiverQueueService,
    SenderTopicService,
    Receiver1TopicService,
    Receiver2TopicService,
  ],
})
export class ServiceBusModule {}
