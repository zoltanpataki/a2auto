export class SearchParameters {
  searchedText: string;
  searchBy: string;
  isSold: boolean;
  page: number;
  totalQuantity: number;

  constructor(searchedText: string, searchBy: string, isSold: boolean, page: number, totalQuantity: number) {
    this.searchedText = searchedText;
    this.searchBy = searchBy;
    this.isSold = isSold;
    this.page = page;
    this.totalQuantity = totalQuantity;
  }
}
