// OCP starter example - add discount types by editing this class (violation)
export type DiscountType = "NONE" | "VIP" | "SEASONAL" | "FLASH";
export class DiscountCalculator {
  calculate(amount: number, type: DiscountType): number {
    if (type === "VIP") return amount * 0.8;
    if (type === "SEASONAL") return amount * 0.9;
    if (type === "FLASH") return amount * 0.5; // newly added -> modification
    return amount;
  }
}
