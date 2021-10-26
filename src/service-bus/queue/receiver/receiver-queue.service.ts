import { ServiceBusClient, delay } from '@azure/service-bus';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReceiverQueueService {
  //https://docs.microsoft.com/pt-br/azure/service-bus-messaging/service-bus-nodejs-how-to-use-queues
  // connection string to your Service Bus namespace
  connectionString = '<SERVICE BUS NAMESPACE CONNECTION STRING>';
  queueName = '<QUEUE NAME>';
  public list = '';

  async receive() {
    if (!this.list) {
      this.list = '';
    }

    // create a Service Bus client using the connection string to the Service Bus namespace
    const sbClient = new ServiceBusClient(this.connectionString);

    // createReceiver() can also be used to create a receiver for a subscription.
    const receiver = sbClient.createReceiver(this.queueName);

    // subscribe and specify the message and error handlers
    receiver.subscribe({
      processMessage: this.receiveMessage,
      processError: this.handleErrors,
    });

    // Waiting long enough before closing the sender to send messages
    await delay(20000);

    await receiver.close();
    await sbClient.close();

    return this.list;
  }

  async receiveMessage(messageReceived): Promise<void> {
    if (!this.list) {
      this.list = '';
    }

    console.log(`Received message: ${messageReceived.body}`);
    this.list += messageReceived.body + '\n';
  }

  async handleErrors(errors): Promise<void> {
    console.log(errors);
    this.list += errors + '\n';
  }

  getHello(): string {
    return 'Hello World!';
  }
}
