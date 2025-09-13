// SRP starter example (intentionally violates SRP)
// Participants will refactor by extracting validator, repository, logger, mailer
export interface Order {
  id?: string;
  total: number;
  email?: string;
  log?: string;
  emailSent?: boolean;
}
export class OrderProcessor {
  process(order: Order): Order {
    if (!order || order.total <= 0) throw new Error("INVALID");
    order.id = Math.random().toString(36).slice(2);
    order.log = `Saved:${order.id}`;
    if (order.email) {
      order.emailSent = true;
    }
    return order;
  }
}
