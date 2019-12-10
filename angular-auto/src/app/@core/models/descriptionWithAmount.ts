export class DescriptionWithAmount {
  id: number;
  description: string;
  amount: number;
  charged: string;


  constructor(id: number, description: string, amount: number, charged: string) {
    this.id = id;
    this.description = description;
    this.amount = amount;
    this.charged = charged;
  }
}
