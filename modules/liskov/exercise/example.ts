// LSP starter example - Square breaks Rectangle expectations
export class Rectangle {
  constructor(public width: number, public height: number) {}
  area() {
    return this.width * this.height;
  }
}
export class Square extends Rectangle {
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
