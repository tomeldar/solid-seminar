// ISP starter example - oversized interface forcing unused implementations
export interface MultiFunctionDevice {
  print(doc: string): void;
  scan(doc: string): void;
  fax(doc: string): void;
}
export class SimplePrinter implements MultiFunctionDevice {
  print(doc: string): void {
    /* printing */
  }
  scan(doc: string): void {
    throw new Error("NOT_SUPPORTED");
  }
  fax(doc: string): void {
    throw new Error("NOT_SUPPORTED");
  }
}
