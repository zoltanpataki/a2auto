import {Order} from "../../@core/models/order";

export interface IOrderState {
  order: Order
  orderProgress: number
  previousOrNew: string
  askForInheritanceTaxCalculation: string
  individualOrCorporate: string
  checkedIndividual: boolean
  checkedCorporate: boolean
  alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready: boolean
  selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate: boolean
  wantInheritanceTaxCalculation: boolean
  inheritanceTax: number
  error: string
}

export const initialOrderState: IOrderState = {
  order: null,
  orderProgress: null,
  previousOrNew: null,
  askForInheritanceTaxCalculation: null,
  individualOrCorporate: null,
  checkedIndividual: null,
  checkedCorporate: null,
  alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready: null,
  selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate: null,
  wantInheritanceTaxCalculation: null,
  inheritanceTax: null,
  error: null
}
