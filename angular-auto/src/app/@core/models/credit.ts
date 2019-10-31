export class Credit {
  bank: string;
  creditType: string;
  initialPayment: number;
  creditAmount: number;
  creditLength: number;
  repayment: number;


  constructor(bank: string, creditType: string, initialPayment: number, creditAmount: number, creditLength: number, repayment: number) {
    this.bank = bank;
    this.creditType = creditType;
    this.initialPayment = initialPayment;
    this.creditAmount = creditAmount;
    this.creditLength = creditLength;
    this.repayment = repayment;
  }
}
