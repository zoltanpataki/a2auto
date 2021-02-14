import {Order} from "../../@core/models/order";

export interface IOrderState {
  order: Order
  orderProgress: number
  previousOrNew: string
  individualOrCorporate: string
  checkedIndividual: boolean
  checkedCorporate: boolean
}

export const initialOrderState: IOrderState = {
  order: null,
  orderProgress: null,
  previousOrNew: null,
  individualOrCorporate: null,
  checkedIndividual: null,
  checkedCorporate: null,
}
