import {RouterReducerState} from "@ngrx/router-store";
import {ICarState, initialCarState} from "./car.state";
import {initialOrderState, IOrderState} from "./order.state";

export interface IAppState {
  router?: RouterReducerState;
  cars: ICarState;
  order: IOrderState;
}

export const initialAppState: IAppState = {
  cars: initialCarState,
  order: initialOrderState
}

export function getInitialState(): IAppState {
  return initialAppState;
}
