import {RouterReducerState} from "@ngrx/router-store";
import {ICarState, initialCarState} from "./car.state";
import {initialOrderState, IOrderState} from "./order.state";
import {initialUserState, IUserState} from "./user.state";
import {ICompanyState, initialCompanyState} from "./company.state";
import {initialWitnessState, IWitnessState} from "./witness.state";
import {initialSalesmanState, ISalesmanState} from "./salesman.state";

export interface IAppState {
  router?: RouterReducerState;
  cars: ICarState;
  order: IOrderState;
  user: IUserState;
  company: ICompanyState;
  witness: IWitnessState;
  salesman: ISalesmanState
}

export const initialAppState: IAppState = {
  cars: initialCarState,
  order: initialOrderState,
  user: initialUserState,
  company: initialCompanyState,
  witness: initialWitnessState,
  salesman: initialSalesmanState,
}

export function getInitialState(): IAppState {
  return initialAppState;
}
