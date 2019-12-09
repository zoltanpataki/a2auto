export class DescriptionWithAmount {
  description: string;
  amount: number;
  charged: boolean;


  constructor(description: string, amount: number, charged: boolean) {
    this.description = description;
    this.amount = amount;
    this.charged = charged;
  }
}
