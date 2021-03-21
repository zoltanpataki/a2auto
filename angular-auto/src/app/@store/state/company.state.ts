import {ICompany} from "../../@core/models/company";

export interface ICompanyState {
  companySearchData: ICompany[];
  pickedCompany: ICompany;
  indexOfPickedCompany: number;
  error: string;
}

export const initialCompanyState: ICompanyState = {
  companySearchData: null,
  pickedCompany: null,
  indexOfPickedCompany: null,
  error: null,
}
