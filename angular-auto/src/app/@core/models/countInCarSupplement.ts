import {Description} from "./description";

export class CountInCarSupplement {

  countInPrice: number;
  previousLoan: number;
  previousBank: string;
  loanType: string;
  description: Description[];


  constructor(countInPrice: number, previousLoan: number, previousBank: string, loanType: string, description: Description[]) {
    this.countInPrice = countInPrice;
    this.previousLoan = previousLoan;
    this.previousBank = previousBank;
    this.loanType = loanType;
    this.description = description;
  }

}
