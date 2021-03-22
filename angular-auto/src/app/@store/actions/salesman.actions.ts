import {Action} from "@ngrx/store";
import {ISalesman} from "../../@core/models/salesmen";

export enum ESalesmanActions {
  GetSalesmen = '[Salesmen] Get salesmen',
  GetSalesmenSuccess = '[Salesmen] Get salesmen success',
  GetSalesmenError = '[string] Get salesmen error',
}

export class GetSalesmen implements Action {
  public readonly type = ESalesmanActions.GetSalesmen;
}

export class GetSalesmenSuccess implements Action {
  public readonly type = ESalesmanActions.GetSalesmenSuccess;
  constructor(public payload: ISalesman[]) {
  }
}

export class GetSalesmenError implements Action {
  public readonly type = ESalesmanActions.GetSalesmenError;
  constructor(public readonly payload: string) {
  }
}

export type SalesmanActions =
  GetSalesmen |
  GetSalesmenSuccess |
  GetSalesmenError;
