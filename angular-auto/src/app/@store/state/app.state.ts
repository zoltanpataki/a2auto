import {RouterReducerState} from "@ngrx/router-store";
import {ICarState, initialCarState} from "./car.state";
import {initialOrderState, IOrderState} from "./order.state";
import {initialUserState, IUserState} from "./user.state";
import {ICompanyState, initialCompanyState} from "./company.state";
import {initialWitnessState, IWitnessState} from "./witness.state";
import {initialSalesmanState, ISalesmanState} from "./salesman.state";
import {initialUtilState, IUtilState} from "./util.state";

export interface IAppState {
  router?: RouterReducerState;
  cars: ICarState;
  order: IOrderState;
  user: IUserState;
  company: ICompanyState;
  witness: IWitnessState;
  salesman: ISalesmanState;
  util: IUtilState;
}

export const initialAppState: IAppState = {
  cars: initialCarState,
  order: initialOrderState,
  user: initialUserState,
  company: initialCompanyState,
  witness: initialWitnessState,
  salesman: initialSalesmanState,
  util: initialUtilState
}

export function getInitialState(): IAppState {
  return initialAppState;
}
