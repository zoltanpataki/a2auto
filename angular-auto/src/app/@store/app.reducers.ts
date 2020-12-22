import {ActionReducerMap} from "@ngrx/store";
import {IAppState} from "./state/app.state";
import {routerReducer} from "@ngrx/router-store";
import {carReducers} from "./reducers/car.reducers";

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  cars: carReducers
};
