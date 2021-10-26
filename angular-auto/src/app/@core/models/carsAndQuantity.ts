import {Car} from "./car";

export class CarsAndQuantity {
  quantity: number;
  cars: Car[];


  constructor(quantity: number, cars: Car[]) {
    this.quantity = quantity;
    this.cars = cars;
  }
}
