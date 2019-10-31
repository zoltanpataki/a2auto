export class Saldo {

  transactionDate: Date;
  moneyIn: number;
  moneyOut: number;
  description: string;

  constructor(transactionDate: Date, moneyIn: number, moneyOut: number, description: string) {
    this.transactionDate = transactionDate;
    this.moneyIn = moneyIn;
    this.moneyOut = moneyOut;
    this.description = description;
  }
}
