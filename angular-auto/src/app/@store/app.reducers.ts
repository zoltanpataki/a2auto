import {ActionReducerMap} from "@ngrx/store";
import {IAppState} from "./state/app.state";
import {routerReducer} from "@ngrx/router-store";
import {carReducers} from "./reducers/car.reducers";
import {orderReducers} from "./reducers/order.reducers";
import {userReducers} from "./reducers/user.reducers";
import {companyReducers} from "./reducers/company.reducers";

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  cars: carReducers,
  order: orderReducers,
  user: userReducers,
  company: companyReducers,
};
