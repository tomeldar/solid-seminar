class Product {
  constructor(
    private title: string,
    private price: number,
    private taxRate: number,
  ) {}

  getName() {
    return this.title;
  }

  getPrice() {
    return this.price;
  }

  calculateTax() {
    return this.price * this.taxRate;
  }
}

const table = new Product('a nice table', 55, 0.1);
console.log(table.calculateTax());
