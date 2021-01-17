import {IAppState} from "../state/app.state";
import {createSelector} from "@ngrx/store";
import {ICarState} from "../state/car.state";

const selectCars = (state: IAppState) => state.cars;

export const selectCarList = createSelector(
  selectCars,
  (state: ICarState) => state.cars
);
