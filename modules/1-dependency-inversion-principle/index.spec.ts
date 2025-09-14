/*
 These tests are intentionally "bad" / brittle. They:
 1. Reach into private implementation details via type assertion & index access.
 2. Spy directly on console.log output of concrete collaborators (SqsQueue, GmailSender).
 3. Stub the global crypto.randomUUID to control output.
 4. Assert on exact log message formatting.

 When we later refactor `OrderService` to follow the Dependency Inversion Principle (injecting abstractions
 for queue + mail sender), these tests are expected to break and force a rewrite. They showcase why
 depending on concretions harms test resilience.
*/
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
import { OrderService } from './index';

describe('001 - Dependency Inversion (brittle tests)', () => {
  let originalUuid: () => string;

  beforeEach(() => {
    const cryptoObj = crypto as unknown as { randomUUID: () => string };
    originalUuid = cryptoObj.randomUUID.bind(cryptoObj);
    // Force deterministic UUID so we can do string match assertions.
    (cryptoObj as { randomUUID: () => string }).randomUUID = jest.fn(
      () => '00000000-0000-4000-8000-000000000000',
    ) as unknown as () => string;
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    // restore
    (crypto as unknown as { randomUUID: () => string }).randomUUID =
      originalUuid;
    jest.restoreAllMocks();
  });

  it('creates an order and sends gmail + sqs message with exact formatting (brittle)', () => {
    const service = new OrderService();

    service.createOrder('Fancy Hat');

    // Access the private fields (bad):
    const serviceObj = service as any;
    const queueInstance = serviceObj._queue;
    const mailSenderInstance = serviceObj._mailSender;

    expect(queueInstance).toBeDefined();
    expect(mailSenderInstance).toBeDefined();

    // Because we mocked console.log globally, capture the calls & assert exact messages.
    const calls = (console.log as jest.Mock).mock.calls.map((c) => c[0]);

    // We expect two concrete messages, tightly coupled to implementation details.
    expect(calls).toContain(
      'Sending Gmail to customer@example.com: New order created: Fancy Hat',
    );
    // The queue message contains serialized order; we assert the full JSON string.
    // This is brittle: any change to Order shape or serialization order will fail.
    expect(
      calls.some((c) =>
        /Sending message to SQS: {"id":"00000000-0000-4000-8000-000000000000","name":"Fancy Hat","createdAt":"[^"]+"}/.test(
          c as string,
        ),
      ),
    ).toBe(true);
  });

  it('fails if internal field names change (demonstrating brittleness)', () => {
    const service = new OrderService();

    // If we renamed _queue to queue or made it truly private via #, this would throw or be undefined.
    const serviceObj = service as any;
    expect(() => serviceObj._queue).not.toThrow();
    expect(serviceObj._queue).toBeDefined();
  });
});
