import {Car, ICar} from "../../@core/models/car";

export interface ICarState {
  cars: Car[];
  pickedCar: Car;
  error: string;
}

export const initialCarState: ICarState = {
  cars: null,
  pickedCar: null,
  error: null
}
