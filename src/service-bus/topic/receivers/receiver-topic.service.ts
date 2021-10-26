import { ServiceBusClient, delay } from '@azure/service-bus';
import { Injectable } from '@nestjs/common';

//https://docs.microsoft.com/pt-br/azure/service-bus-messaging/service-bus-nodejs-how-to-use-queues
@Injectable()
export class ReceiverTopicService {
  async receive(
    connectionString: string,
    topicName: string,
    subscriptionName: string,
  ) {
    const sbClient = new ServiceBusClient(connectionString);
    const receiver = sbClient.createReceiver(topicName, subscriptionName);

    receiver.subscribe({
      processMessage: this.receiveMessage,
      processError: this.handleErrors,
    });

    await delay(20000);

    await receiver.close();
    await sbClient.close();
  }

  async receiveMessage(messageReceived): Promise<void> {
    console.log(`Received message: ${messageReceived.body}`);
  }

  async handleErrors(errors): Promise<void> {
    console.log(errors);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
