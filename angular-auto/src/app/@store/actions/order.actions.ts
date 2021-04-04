import {Action} from "@ngrx/store";
import {IOrder, Order} from "../../@core/models/order";
import {
  InheritanceTaxErrorResponse,
  InheritanceTaxInfoForChainedApiCall
} from "../../@core/models/inheritanceTax";
import {ICar} from "../../@core/models/car";
import {CountInCarSupplement} from "../../@core/models/countInCarSupplement";

export enum EOrderActions {
  StorePreviousOrNew = '[string] Store previous or new customer flag',
  StoreIndividualOrCorporate = '[string] Store individual or corporate customer flag',
  StoreAskForInheritanceTaxCalculation = '[string] Store with or without calculation flag and calls backend for calculation data',
  StoreAddCountInCar = '[string] Store whether with or without count in car',
  UpdateOrderProgress = '[number] Update order progress',
  UpdateOrder = '[Order] Update order',
  StoreAlreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready = '[boolean] Store alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready flag',
  StoreSelectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate = '[boolean] Store selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate flag',
  StoreWantInheritanceTaxCalculation = '[boolean] Store wantInheritanceTaxCalculation flag',
  StoreThereIsCountInCar = '[boolean] Store if there is count in car',
  GetCapacity = '[InheritanceTaxInfoForChainedApiCall] Get capacity',
  GetCarRegistry = '[InheritanceTaxInfoForChainedApiCall] Get car registry',
  GetInheritanceTaxError = '[InheritanceTaxErrorResponse] Get utility error',
  GetChargeForInheritanceTax = '[InheritanceTaxInfoForChainedApiCall] Get charge for inheritance tax',
  GetExtraChargeAtSelling = '[InheritanceTaxInfoForChainedApiCall] Get extra charge at selling for inheritance tax',
  GetInheritanceTaxSuccess = '[number] Get inheritance tax success',
  StoreCountInCar = '[Car] Store count in car',
  StoreCountInCarSupplement = '[CountInCarSupplement] Store count in car supplement',
  StoreDownPayment = '[number] Store down payment',
  StoreExtraPayment = '[number] Store extra payment',
  GetOrder = '[number] Get order',
  GetOrderSuccess = '[Order] Get order success',
  GetOrderError = '[string] Get order error',
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

export class StoreAddCountInCar implements Action {
  public readonly type = EOrderActions.StoreAddCountInCar;
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

export class StoreThereIsCountInCar implements Action {
  public readonly type = EOrderActions.StoreThereIsCountInCar;
  constructor(public payload: boolean) {}
}

export class StoreCountInCar implements Action {
  public readonly type = EOrderActions.StoreCountInCar;
  constructor(public readonly payload: ICar) {}
}

export class StoreCountInCarSupplement implements Action {
  public readonly type = EOrderActions.StoreCountInCarSupplement;
  constructor(public readonly payload : CountInCarSupplement) {}
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

export class StoreDownPayment implements Action {
  public readonly type = EOrderActions.StoreDownPayment;
  constructor(public readonly payload: number) {
  }
}

export class StoreExtraPayment implements Action {
  public readonly type = EOrderActions.StoreExtraPayment;
  constructor(public readonly payload: number) {
  }
}

export class GetOrder implements Action {
  public readonly type = EOrderActions.GetOrder;
  constructor(public readonly payload: number) {
  }
}

export class GetOrderSuccess implements Action {
  public readonly type = EOrderActions.GetOrderSuccess;
  constructor(public readonly payload: IOrder) {
  }
}

export class GetOrderError implements Action {
  public readonly type = EOrderActions.GetOrderError;
  constructor(public readonly payload: string) {
  }
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
  GetInheritanceTaxSuccess |
  StoreAddCountInCar |
  StoreThereIsCountInCar |
  StoreCountInCar |
  StoreCountInCarSupplement |
  StoreDownPayment |
  StoreExtraPayment |
  GetOrder |
  GetOrderSuccess |
  GetOrderError;
