import {RouterReducerState} from "@ngrx/router-store";
import {ICarState, initialCarState} from "./car.state";

export interface IAppState {
  router?: RouterReducerState;
  cars: ICarState;
}

export const initialAppState: IAppState = {
  cars: initialCarState
}

export function getInitialState(): IAppState {
  return initialAppState;
}
