import {ICompany} from "../../@core/models/company";

export interface ICompanyState {
  companySearchData: ICompany[];
  pickedCompany: ICompany;
  error: string;
}

export const initialCompanyState: ICompanyState = {
  companySearchData: null,
  pickedCompany: null,
  error: null,
}
