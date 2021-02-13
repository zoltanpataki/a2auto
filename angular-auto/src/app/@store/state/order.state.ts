import {Order} from "../../@core/models/order";

export interface IOrderState {
  order: Order
}

export const initialOrderState: IOrderState = {
  order: null
}
