import {Action} from "@ngrx/store";
import {CarFilterRequest, CarUpdateModel, ICar} from "../../@core/models/car";

export enum ECarActions {
  GetCars = '[Car] Get cars',
  GetCarsSuccess = '[Car] Get cars success',
  GetFilteredCars = '[Car] Get filtered cars',
  GetFilteredCarsSuccess = '[Car] Get filtered cars success',
  GetFilteredCarsError = '[string] Get filtered cars error',
  GetCarsError = '[string] Get cars error',
  StoreClickedCarIndex = '[number] Store clicked car index',
  StorePickedCar = '[Car] Store picked car',
  UpdateCarError = '[string] Update car error',
  StoreNameOfBuyer = '[CarUpdateRequest] Store name of buyer',
  StoreDownPayment = '[CarUpdateRequest] Store down payment',
}

export class GetCars implements Action {
  public readonly type = ECarActions.GetCars;
  constructor(public payload: boolean) {}
}

export class GetCarsSuccess implements Action {
  public readonly type = ECarActions.GetCarsSuccess;
  constructor(public payload: ICar[]) {}
}

export class GetFilteredCars implements Action {
  public readonly type = ECarActions.GetFilteredCars;
  constructor(public payload: CarFilterRequest) {}
}

export class GetFilteredCarsSuccess implements Action {
  public readonly type = ECarActions.GetFilteredCarsSuccess;
  constructor(public readonly payload: ICar[]) {}
}

export class GetFilteredCarsError implements Action {
  public readonly type = ECarActions.GetFilteredCarsError;
  constructor(public readonly payload: string) {
  }
}

export class GetCarsError implements Action {
  public readonly type = ECarActions.GetCarsError;
  constructor(public readonly payload: string) {
  }
}

export class StorePickedCar implements Action {
  public readonly type = ECarActions.StorePickedCar;
  constructor(public readonly payload: ICar) {
  }
}

export class StoreClickedCarIndex implements Action {
  public readonly type = ECarActions.StoreClickedCarIndex;
  constructor(public readonly payload: number) {
  }
}

export class UpdateCarError implements Action {
  public readonly type = ECarActions.UpdateCarError;
  constructor(public readonly payload: string) {
  }
}

export class StoreNameOfBuyer implements Action {
  public readonly type = ECarActions.StoreNameOfBuyer;
  constructor(public readonly payload: CarUpdateModel) {
  }
}

export class StoreDownPayment implements Action {
  public readonly type = ECarActions.StoreDownPayment;
  constructor(public readonly payload: CarUpdateModel) {
  }
}

export type CarActions =
  GetCars |
  GetCarsSuccess |
  GetFilteredCars |
  GetFilteredCarsSuccess |
  GetFilteredCarsError |
  GetCarsError |
  StoreClickedCarIndex |
  StorePickedCar |
  UpdateCarError |
  StoreNameOfBuyer |
  StoreDownPayment;
