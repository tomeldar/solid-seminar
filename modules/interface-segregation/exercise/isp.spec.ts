import { describe, it, expect } from "vitest";
// Oversized interface
interface MultiFunctionDevice {
  print(doc: string): void;
  scan(doc: string): void;
  fax(doc: string): void;
}

class SimplePrinter implements MultiFunctionDevice {
  // forced to implement unused members -> smell
  print(doc: string): void {
    /* pretend print */
  }
  scan(doc: string): void {
    throw new Error("NOT_SUPPORTED");
  }
  fax(doc: string): void {
    throw new Error("NOT_SUPPORTED");
  }
}

describe("ISP exercise", () => {
  it("forces unused method implementation", () => {
    const printer = new SimplePrinter();
    expect(() => printer.scan("x")).not.toThrow(); // actually throws -> RED
  });
});
