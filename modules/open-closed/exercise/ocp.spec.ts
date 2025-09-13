import { describe, it, expect } from "vitest";
// Violation: modifying class for new discount types instead of extending
class DiscountCalculator {
  calculate(
    amount: number,
    type: "NONE" | "VIP" | "SEASONAL" | "FLASH"
  ): number {
    if (type === "VIP") return amount * 0.8;
    if (type === "SEASONAL") return amount * 0.9;
    // new type introduced -> class modified (FLASH). Exercise: refactor to strategy
    if (type === "FLASH") return amount * 0.5;
    return amount;
  }
}

describe("OCP exercise", () => {
  it("adding new behavior required modifying existing class (should drive refactor)", () => {
    const calc = new DiscountCalculator();
    const discounted = calc.calculate(100, "FLASH");
    expect(discounted).toBe(50);
    // Force failing expectation to push for extension model
    expect(calc.calculate(100, "VIP")).toBe(100); // currently 80 -> RED
  });
});
