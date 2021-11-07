import {IAppState} from "../state/app.state";
import {createSelector} from "@ngrx/store";
import {ICarState} from "../state/car.state";

const selectCars = (state: IAppState) => state.cars;

export const selectCarList = createSelector(
  selectCars,
  (state: ICarState) => state.carsAndQuantity
);

export const selectCarError = createSelector(
  selectCars,
  (state: ICarState) => state.error
);

export const selectPickedCar = createSelector(
  selectCars,
  (state: ICarState) => state.pickedCar
);

export const selectSearchParameters = createSelector(
  selectCars,
  (state: ICarState) => state.searchParameters
);

export const selectClickedCarIndex = createSelector(
  selectCars,
  (state: ICarState) => state.clickedCarIndex
);
