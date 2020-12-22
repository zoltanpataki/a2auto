import {ICar} from "../../@core/models/car";

export interface ICarState {
  cars: ICar[];
  pickedCar: ICar;
}

export const initialCarState: ICarState = {
  cars: null,
  pickedCar: null
}
