export class Order {
  constructor(
    public id: string,
    public name: string,
    public createdAt: Date = new Date(),
  ) {}
}
