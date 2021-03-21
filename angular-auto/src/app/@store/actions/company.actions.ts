import {Action} from "@ngrx/store";
import {CompanyFilterRequest, ICompany} from "../../@core/models/company";

export enum ECompanyActions {
  GetCompanies = '[Company] Get companies',
  GetCompaniesSuccess = '[Company] Get companies success',
  GetCompaniesError = '[string] Get company error',
  StorePickedCompany = '[Company] Store picked company',
  StorePickedCompanyIndex = '[number] Store picked company index',
}

export class GetCompanies implements Action {
  public readonly type = ECompanyActions.GetCompanies;

  constructor(public payload: CompanyFilterRequest) {
  }
}

export class GetCompaniesSuccess implements Action {
  public readonly type = ECompanyActions.GetCompaniesSuccess;

  constructor(public payload: ICompany[]) {
  }
}

export class GetCompaniesError implements Action {
  public readonly type = ECompanyActions.GetCompaniesError;

  constructor(public readonly payload: string) {
  }
}

export class StorePickedCompany implements Action {
  public readonly type = ECompanyActions.StorePickedCompany;

  constructor(public readonly payload: ICompany) {
  }
}

export class StorePickedCompanyIndex implements Action {
  public readonly type = ECompanyActions.StorePickedCompanyIndex;

  constructor(public readonly payload: number) {
  }
}

export type CompanyActions =
  GetCompanies |
  GetCompaniesSuccess |
  GetCompaniesError |
  StorePickedCompany |
  StorePickedCompanyIndex;
