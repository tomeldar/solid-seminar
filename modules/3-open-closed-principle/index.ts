export class PaymentProcessor {
  process(type: string, amount: number) {
    if (type === 'credit-card') {
      console.log(`Processing $${amount} with Credit Card`);
    } else if (type === 'paypal') {
      console.log(`Processing $${amount} with PayPal`);
    } else if (type === 'venmo') {
      console.log(`Processing $${amount} with Venmo`);
    } else {
      throw new Error('Unsupported payment type');
    }
  }
}
