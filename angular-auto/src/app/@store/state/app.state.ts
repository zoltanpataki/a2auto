import {RouterReducerState} from "@ngrx/router-store";
import {ICarState, initialCarState} from "./car.state";
import {initialOrderState, IOrderState} from "./order.state";
import {initialUserState, IUserState} from "./user.state";
import {ICompanyState, initialCompanyState} from "./company.state";

export interface IAppState {
  router?: RouterReducerState;
  cars: ICarState;
  order: IOrderState;
  user: IUserState;
  company: ICompanyState
}

export const initialAppState: IAppState = {
  cars: initialCarState,
  order: initialOrderState,
  user: initialUserState,
  company: initialCompanyState,
}

export function getInitialState(): IAppState {
  return initialAppState;
}
