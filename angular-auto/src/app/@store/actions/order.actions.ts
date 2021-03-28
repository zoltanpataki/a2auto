import {Action} from "@ngrx/store";
import {IOrder} from "../../@core/models/order";
import {
  InheritanceTaxErrorResponse,
  InheritanceTaxInfoForChainedApiCall
} from "../../@core/models/inheritanceTax";

export enum EOrderActions {
  StorePreviousOrNew = '[string] Store previous or new customer flag',
  StoreIndividualOrCorporate = '[string] Store individual or corporate customer flag',
  StoreAskForInheritanceTaxCalculation = '[string] Store with or without calculation flag and calls backend for calculation data',
  UpdateOrderProgress = '[number] Update order progress',
  UpdateOrder = '[Order] Update order',
  StoreAlreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready = '[boolean] Store alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready flag',
  StoreSelectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate = '[boolean] Store selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate flag',
  StoreWantInheritanceTaxCalculation = '[boolean] Store wantInheritanceTaxCalculation flag',
  GetCapacity = '[InheritanceTaxInfoForChainedApiCall] Get capacity',
  GetCarRegistry = '[InheritanceTaxInfoForChainedApiCall] Get car registry',
  GetInheritanceTaxError = '[InheritanceTaxErrorResponse] Get utility error',
  GetChargeForInheritanceTax = '[InheritanceTaxInfoForChainedApiCall] Get charge for inheritance tax',
  GetExtraChargeAtSelling = '[InheritanceTaxInfoForChainedApiCall] Get extra charge at selling for inheritance tax',
  GetInheritanceTaxSuccess = '[number] Get inheritance tax success',
}

export class StorePreviousOrNew implements Action {
  public readonly type = EOrderActions.StorePreviousOrNew;
  constructor(public payload: string) {}
}

export class StoreIndividualOrCorporate implements Action {
  public readonly type = EOrderActions.StoreIndividualOrCorporate;
  constructor(public payload: string) {}
}

export class StoreAskForInheritanceTaxCalculation implements Action {
  public readonly type = EOrderActions.StoreAskForInheritanceTaxCalculation;
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

export class StoreWantInheritanceTaxCalculation implements Action {
  public readonly type = EOrderActions.StoreWantInheritanceTaxCalculation;
  constructor(public payload: boolean) {}
}

export class UpdateOrder implements Action {
  public readonly type = EOrderActions.UpdateOrder;
  constructor(public payload: IOrder) {}
}

export class GetCapacity implements Action {
  public readonly type = EOrderActions.GetCapacity;
  constructor(public readonly payload: InheritanceTaxInfoForChainedApiCall) {}
}

export class GetCarRegistry implements Action {
  public readonly type = EOrderActions.GetCarRegistry;
  constructor(public readonly payload: InheritanceTaxInfoForChainedApiCall) {}
}

export class GetInheritanceTaxError implements Action {
  public readonly type = EOrderActions.GetInheritanceTaxError;
  constructor(public readonly payload: InheritanceTaxErrorResponse) {}
}

export class GetChargeForInheritanceTax implements Action {
  public readonly type = EOrderActions.GetChargeForInheritanceTax;
  constructor(public readonly payload: InheritanceTaxInfoForChainedApiCall) {}
}

export class GetExtraChargeAtSelling implements Action {
  public readonly type = EOrderActions.GetExtraChargeAtSelling;
  constructor(public readonly payload: InheritanceTaxInfoForChainedApiCall) {}
}

export class GetInheritanceTaxSuccess implements Action {
  public readonly type = EOrderActions.GetInheritanceTaxSuccess;
  constructor(public readonly payload: number) {}
}

export type OrderActions =
  StorePreviousOrNew |
  UpdateOrderProgress |
  UpdateOrder |
  StoreAlreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready |
  StoreSelectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate |
  StoreIndividualOrCorporate |
  StoreAskForInheritanceTaxCalculation |
  StoreWantInheritanceTaxCalculation |
  GetCapacity |
  GetCarRegistry |
  GetExtraChargeAtSelling |
  GetInheritanceTaxError |
  GetChargeForInheritanceTax |
  GetInheritanceTaxSuccess;
