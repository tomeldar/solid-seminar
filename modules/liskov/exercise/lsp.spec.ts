import { describe, it, expect } from "vitest";
// LSP Violation: Square extends Rectangle but breaks width/height independent invariant
class Rectangle {
  constructor(public width: number, public height: number) {}
  area() {
    return this.width * this.height;
  }
}
class Square extends Rectangle {
  constructor(size: number) {
    super(size, size);
  }
  set width(v: number) {
    this.height = v;
    (this as any)._w = v;
  }
  get width() {
    return (this as any)._w;
  }
}

describe("LSP exercise", () => {
  it("violated substitutability (area expectation fails)", () => {
    const rect: Rectangle = new Square(4);
    rect.width = 5; // expects only width change, but height also changed
    expect(rect.area()).toBe(20); // actually 25 -> RED
  });
});
