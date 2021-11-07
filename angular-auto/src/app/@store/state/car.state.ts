import {ICar} from "../../@core/models/car";
import {SearchParameters} from "../../@core/models/searchParameters";
import {CarsAndQuantity} from "../../@core/models/carsAndQuantity";

export interface ICarState {
  carsAndQuantity: CarsAndQuantity;
  pickedCar: ICar;
  clickedCarIndex: number;
  searchParameters: SearchParameters;
  error: string;
}

export const initialCarState: ICarState = {
  carsAndQuantity: null,
  pickedCar: null,
  clickedCarIndex: null,
  searchParameters: null,
  error: null
}
