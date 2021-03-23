import {Action} from "@ngrx/store";
import {ISalesmen} from "../../@core/models/salesmen";

export enum ESalesmanActions {
  GetSalesmen = '[Salesmen] Get salesmen',
  GetSalesmenSuccess = '[Salesmen] Get salesmen success',
  SalesmenError = '[string] salesmen error',
  StoreSalesman = '[Salesmen] Store salesman',
  StoreSalesmanSuccess = '[Salesmen] Store salesman success',
  DeleteSalesman = '[number] Delete salesman',
  DeleteSalesmanSuccess = '[number] Delete salesman success',
}

export class GetSalesmen implements Action {
  public readonly type = ESalesmanActions.GetSalesmen;
}

export class GetSalesmenSuccess implements Action {
  public readonly type = ESalesmanActions.GetSalesmenSuccess;
  constructor(public payload: ISalesmen[]) {
  }
}

export class SalesmenError implements Action {
  public readonly type = ESalesmanActions.SalesmenError;
  constructor(public readonly payload: string) {
  }
}

export class StoreSalesman implements Action {
  public readonly type = ESalesmanActions.StoreSalesman;
  constructor(public payload: ISalesmen) {
  }
}

export class StoreSalesmanSuccess implements Action {
  public readonly type = ESalesmanActions.StoreSalesmanSuccess;
  constructor(public payload: ISalesmen) {
  }
}

export class DeleteSalesman implements Action {
  public readonly type = ESalesmanActions.DeleteSalesman;
  constructor(public payload: number) {
  }
}

export class DeleteSalesmanSuccess implements Action {
  public readonly type = ESalesmanActions.DeleteSalesmanSuccess;
  constructor(public payload: number) {
  }
}

export type SalesmanActions =
  GetSalesmen |
  GetSalesmenSuccess |
  SalesmenError |
  StoreSalesman |
  StoreSalesmanSuccess |
  DeleteSalesman |
  DeleteSalesmanSuccess;
