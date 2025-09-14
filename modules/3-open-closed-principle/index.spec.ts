import { PaymentProcessor } from './index';

describe('PaymentProcessor (Open/Closed principle anti-pattern example)', () => {
  let processor: PaymentProcessor;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    processor = new PaymentProcessor();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('processes credit card payments', () => {
    processor.process('credit-card', 100);
    expect(consoleSpy).toHaveBeenCalledWith('Processing $100 with Credit Card');
  });

  it('processes paypal payments', () => {
    processor.process('paypal', 50);
    expect(consoleSpy).toHaveBeenCalledWith('Processing $50 with PayPal');
  });

  it('processes venmo payments', () => {
    processor.process('venmo', 25);
    expect(consoleSpy).toHaveBeenCalledWith('Processing $25 with Venmo');
  });

  it('throws for unsupported payment type', () => {
    expect(() => processor.process('crypto', 999)).toThrow('Unsupported payment type');
  });
});
