import {ICar} from "../../@core/models/car";

export interface ICarState {
  cars: ICar[];
  pickedCar: ICar;
  error: string;
}

export const initialCarState: ICarState = {
  cars: null,
  pickedCar: null,
  error: null
}
