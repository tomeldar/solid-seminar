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

describe('1 - Dependency Inversion (brittle tests)', () => {
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
    (crypto as unknown as { randomUUID: () => string }).randomUUID = originalUuid;
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
    expect(calls).toContain('Sending Gmail to customer@example.com: New order created: Fancy Hat');
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

// ---------------------------------------------------------------------------
// Future (skipped) tests illustrating the desired shape AFTER refactoring
// OrderService to follow the Dependency Inversion Principle. These are added
// now so you can immediately compare the difference in surface area:
//  - No peeking at private fields.
//  - No spying on console.log or asserting exact string formatting.
//  - Only verify that the abstract collaborators were invoked with meaningful
//    (but not over‑specified) arguments.
//
// Refactor target (illustrative):
//   export class OrderService {
//     constructor(
//       private readonly queue: QueuePort,
//       private readonly mailSender: MailSenderPort,
//       private readonly uuid: () => string = crypto.randomUUID,
//     ) {}
//     createOrder(name: string) { ... }
//   }
//
// When that refactor is complete: remove the `.skip`, delete the `@ts-expect-error`
// annotations, and (optionally) delete the local interface declarations if you
// export them from the production module.
// ---------------------------------------------------------------------------
describe.skip('1 - Dependency Inversion (future resilient tests)', () => {
  // Minimal local replicas of the future abstraction contracts. Once real
  // interfaces (e.g. QueuePort, MailSenderPort) are exported, replace these
  // with imports.
  interface IQueuePort {
    sendMessage(message: string): void;
  }
  interface IMailPort {
    sendMessage(to: string, body: string): void;
  }

  it('creates an order and only asserts collaborator interaction (no formatting brittleness)', () => {
    const queueSendFn = jest.fn();
    const mailSendFn = jest.fn();
    const queue: IQueuePort = { sendMessage: queueSendFn };
    const mailSender: IMailPort = { sendMessage: mailSendFn };
    const fixedUuid = '00000000-0000-4000-8000-000000000000';
    const fakeUuidFn = () => fixedUuid;

    // This will compile after the refactor. For now it is intentionally a type error.
    // @ts-expect-error Constructor DI not implemented yet
    const service = new OrderService(queue, mailSender, fakeUuidFn);

    service.createOrder('Fancy Hat');

    // Assert ONLY that the abstractions were invoked with semantically relevant arguments.
    const mailMock = mailSendFn;
    expect(mailMock.mock.calls).toHaveLength(1);
    expect(mailMock).toHaveBeenCalledWith('customer@example.com', expect.stringContaining('Fancy Hat'));

    const queueSendMock = queueSendFn;
    expect(queueSendMock.mock.calls).toHaveLength(1);
    const payload = queueSendMock.mock.calls[0][0] as string;
    // We DO NOT assert the exact JSON string or property order – just that it is valid JSON
    // and carries the essential data (id + name). This is far less brittle.
    expect(() => JSON.parse(payload)).not.toThrow();
    const parsed = JSON.parse(payload) as Record<string, unknown>;
    expect(parsed).toMatchObject({ id: fixedUuid, name: 'Fancy Hat' });
    // We intentionally avoid checking createdAt formatting; existence is enough.
    expect(parsed.createdAt).toBeDefined();
  });

  it('does not rely on internal/private field names or console logging', () => {
    const queueSendFn2 = jest.fn();
    const mailSendFn2 = jest.fn();
    const queue: IQueuePort = { sendMessage: queueSendFn2 };
    const mailSender: IMailPort = { sendMessage: mailSendFn2 };

    // @ts-expect-error Constructor DI not implemented yet
    const service = new OrderService(queue, mailSender);
    service.createOrder('Minimal Check');

    // No access to (service as any)._queue etc. We ONLY care that the collaboration happened.
    expect(mailSendFn2.mock.calls).toHaveLength(1);
    expect(queueSendFn2.mock.calls).toHaveLength(1);
  });
});
