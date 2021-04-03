import {Order} from "../../@core/models/order";
import {ICar} from "../../@core/models/car";
import {CountInCarSupplement} from "../../@core/models/countInCarSupplement";

export interface IOrderState {
  order: Order
  orderProgress: number
  previousOrNew: string
  askForInheritanceTaxCalculation: string
  addCountInCar: string
  individualOrCorporate: string
  checkedIndividual: boolean
  checkedCorporate: boolean
  alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready: boolean
  selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate: boolean
  wantInheritanceTaxCalculation: boolean
  thereIsCountInCar: boolean
  inheritanceTax: number
  countInCar: ICar
  countInCarSupplement: CountInCarSupplement
  downPayment: number
  extraPayment: number
  error: string
}

export const initialOrderState: IOrderState = {
  order: null,
  orderProgress: null,
  previousOrNew: null,
  askForInheritanceTaxCalculation: null,
  addCountInCar: null,
  individualOrCorporate: null,
  checkedIndividual: null,
  checkedCorporate: null,
  alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready: null,
  selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate: null,
  wantInheritanceTaxCalculation: null,
  thereIsCountInCar: null,
  inheritanceTax: null,
  countInCar: null,
  countInCarSupplement: null,
  downPayment: null,
  extraPayment: null,
  error: null
}
