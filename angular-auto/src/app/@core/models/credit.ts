export class Credit {
  id: number;
  bank: string;
  creditType: string;
  initialPayment: number;
  creditAmount: number;
  creditLength: number;
  repayment: number;


  constructor(id: number, bank: string, creditType: string, initialPayment: number, creditAmount: number, creditLength: number, repayment: number) {
    this.id = id;
    this.bank = bank;
    this.creditType = creditType;
    this.initialPayment = initialPayment;
    this.creditAmount = creditAmount;
    this.creditLength = creditLength;
    this.repayment = repayment;
  }
}
