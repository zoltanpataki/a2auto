import {Action} from "@ngrx/store";
import {CarFilterRequest, CarUpdateModel, ICar} from "../../@core/models/car";
import {SearchParameters} from "../../@core/models/searchParameters";
import {CarsAndQuantity} from "../../@core/models/carsAndQuantity";

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
  UpdateCarSalesman = '[CarUpdateRequest] Update car salesman',
  UpdateCarHandOverDate = '[CarUpdateRequest] Update car hand over date',
  UpdateCarTypeOfBuying = '[CarUpdateRequest] Update car type of buying',
  UpdateSearchParameters = '[SearchParameters] Update search parameters',
}

export class GetCars implements Action {
  public readonly type = ECarActions.GetCars;
  constructor(public payload: CarFilterRequest) {}
}

export class GetCarsSuccess implements Action {
  public readonly type = ECarActions.GetCarsSuccess;
  constructor(public payload: CarsAndQuantity) {}
}

export class GetFilteredCars implements Action {
  public readonly type = ECarActions.GetFilteredCars;
  constructor(public payload: CarFilterRequest) {}
}

export class GetFilteredCarsSuccess implements Action {
  public readonly type = ECarActions.GetFilteredCarsSuccess;
  constructor(public readonly payload: CarsAndQuantity) {}
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

export class UpdateCarSalesman implements Action {
  public readonly type = ECarActions.UpdateCarSalesman;
  constructor(public readonly payload: CarUpdateModel) {
  }
}

export class UpdateCarHandOverDate implements Action {
  public readonly type = ECarActions.UpdateCarHandOverDate;
  constructor(public readonly payload: CarUpdateModel) {
  }
}

export class UpdateCarTypeOfBuying implements Action {
  public readonly type = ECarActions.UpdateCarTypeOfBuying;
  constructor(public readonly payload: CarUpdateModel) {
  }
}

export class UpdateSearchParameters implements Action {
  public readonly type = ECarActions.UpdateSearchParameters;
  constructor(public readonly payload: SearchParameters) {
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
  UpdateCarSalesman |
  UpdateCarHandOverDate |
  UpdateCarTypeOfBuying |
  UpdateSearchParameters;
