import { Module } from '@nestjs/common';
import { QueueController } from './queue/queue.controller';
import { SenderQueueService } from './queue/sender/sender-queue.service';
import { ReceiverQueueService } from './queue/receiver/receiver-queue.service';
import { TopicController } from './topic/topic.controller';
import { SenderTopicService } from './topic/sender/sender-topic.service';
import { ReceiverTopicService } from './topic/receivers/receiver-topic.service';
import { ServiceBusProvider } from './config/service/service-bus.provider';
import 'dotenv/config';

@Module({
  imports: [],
  controllers: [QueueController, TopicController],
  providers: [
    SenderQueueService,
    ReceiverQueueService,
    SenderTopicService,
    ReceiverTopicService,
    ServiceBusProvider,
    { provide: 'QUEUE_NAME', useValue: process.env.QUEUE_NAME },
    { provide: 'TOPIC_NAME', useValue: process.env.TOPIC_NAME },
    { provide: 'CONNECTION', useValue: process.env.ENDPOINT_SB },
  ],
})
export class ServiceBusModule {}
