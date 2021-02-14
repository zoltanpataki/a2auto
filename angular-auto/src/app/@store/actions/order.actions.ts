import {Action} from "@ngrx/store";
import {IOrder} from "../../@core/models/order";

export enum EOrderActions {
  StorePreviousOrNew = '[string] Store previous or new customer flag',
  StoreIndividualOrCorporate = '[string] Store individual or corporate customer flag',
  UpdateOrderProgress = '[number] Update order progress',
  UpdateOrder = '[Order] Update order',
  StoreAlreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready = '[boolean] Store alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready flag',
  StoreSelectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate = '[boolean] Store selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate flag',
}

export class StorePreviousOrNew implements Action {
  public readonly type = EOrderActions.StorePreviousOrNew;
  constructor(public payload: string) {}
}

export class StoreIndividualOrCorporate implements Action {
  public readonly type = EOrderActions.StoreIndividualOrCorporate;
  constructor(public payload: string) {}
}

export class UpdateOrderProgress implements Action {
  public readonly type = EOrderActions.UpdateOrderProgress;
  constructor(public payload: number) {}
}

export class StoreAlreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready implements Action {
  public readonly type = EOrderActions.StoreAlreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready;
  constructor(public payload: boolean) {}
}
export class StoreSelectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate implements Action {
  public readonly type = EOrderActions.StoreSelectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate;
  constructor(public payload: boolean) {}
}

export class UpdateOrder implements Action {
  public readonly type = EOrderActions.UpdateOrder;
  constructor(public payload: IOrder) {}
}

export type OrderActions =
  StorePreviousOrNew |
  UpdateOrderProgress |
  UpdateOrder |
  StoreAlreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready |
  StoreSelectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate |
  StoreIndividualOrCorporate;
