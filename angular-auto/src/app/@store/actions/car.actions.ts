import {Action} from "@ngrx/store";
import {CarFilterRequest, ICar} from "../../@core/models/car";

export enum ECarActions {
  GetCars = '[Car] Get cars',
  GetCarsSuccess = '[Car] Get cars success',
  GetFilteredCars = '[Car] Get filtered cars',
  GetFilteredCarsSuccess = '[Car] Get filtered cars success'
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
  constructor(public payload: ICar[]) {}
}

export type CarActions = GetCars | GetCarsSuccess | GetFilteredCars | GetFilteredCarsSuccess;
