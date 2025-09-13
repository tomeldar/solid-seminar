import { describe, it, expect } from "vitest";
// Intentionally violating SRP: OrderProcessor both validates, saves, logs, and emails
class OrderProcessor {
  process(order: any) {
    // validate
    if (!order || !order.total || order.total <= 0) throw new Error("INVALID");
    // persist (fake)
    order.id = Math.random().toString(36).slice(2);
    // log
    order.log = `Saved:${order.id}`;
    // email side effect
    order.emailSent = true;
    return order;
  }
}

describe("SRP exercise (should fail until refactored)", () => {
  it("hard to test multiple responsibilities", () => {
    const p = new OrderProcessor();
    const result = p.process({ total: 10 });
    expect(result).toHaveProperty("id");
    // Failing expectation forces refactor to separate concerns
    expect(result).not.toHaveProperty("emailSent"); // currently WILL have -> RED
  });
});
