import { Order } from 'modules/models/order';

interface ISqsQueue {
  sendMessage(message: string): void;
}

class SqsQueue implements ISqsQueue {
  sendMessage(message: string) {
    console.log(`Sending message to SQS: ${message}`);
  }
}

interface IMailSender {
  sendGmailMessage(to: string, body: string): void;
}

class GmailSender implements IMailSender {
  sendGmailMessage(to: string, body: string): void {
    console.log(`Sending Gmail to ${to}: ${body}`);
  }
}

export class OrderService {
  private _queue: SqsQueue = new SqsQueue();
  private _mailSender: IMailSender = new GmailSender();

  createOrder(name: string) {
    const order = new Order(crypto.randomUUID(), name);

    this._mailSender.sendGmailMessage('customer@example.com', `New order created: ${name}`);
    this._queue.sendMessage(JSON.stringify(order));
  }
}
