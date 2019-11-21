import {Description} from "./description";

export class CountInCarSupplement {

  countInPrice: number;
  previousLoan: number;
  previousBank: string;
  loanType: string;


  constructor(countInPrice: number, previousLoan: number, previousBank: string, loanType: string) {
    this.countInPrice = countInPrice;
    this.previousLoan = previousLoan;
    this.previousBank = previousBank;
    this.loanType = loanType;
  }

}
