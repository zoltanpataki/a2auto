import {ICar} from "../../@core/models/car";

export interface ICarState {
  cars: ICar[];
  pickedCar: ICar;
  clickedCarIndex: number;
  error: string;
}

export const initialCarState: ICarState = {
  cars: null,
  pickedCar: null,
  clickedCarIndex: null,
  error: null
}
