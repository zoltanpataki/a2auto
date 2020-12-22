import {Action} from "@ngrx/store";
import {ICar} from "../../@core/models/car";

export enum ECarActions {
  GetCars = '[Car] Get cars',
  GetCarsSuccess = '[Car] Get cars success'
}

export class GetCars implements Action {
  public readonly type = ECarActions.GetCars;
  constructor(public payload: boolean) {}
}

export class GetCarsSuccess implements Action {
  public readonly type = ECarActions.GetCarsSuccess;
  constructor(public payload: ICar[]) {}
}

export type CarActions = GetCars | GetCarsSuccess;
