import {Order} from "../../@core/models/order";
import {ICar} from "../../@core/models/car";
import {CountInCarSupplement} from "../../@core/models/countInCarSupplement";
import {IUser} from "../../@core/models/users";
import {ICompany} from "../../@core/models/company";
import {DescriptionWithAmount} from "../../@core/models/descriptionWithAmount";
import {ICredit} from "../../@core/models/credit";
import {Description} from "../../@core/models/description";

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
  orderError: string
  inheritanceTaxError: string
  newUser: IUser
  newCompany: ICompany
  salesman: string
  descriptionsWithAmount: DescriptionWithAmount[]
  remarks: Description[]
  giftIndexList: number[]
  typeOfBuying: string
  credit: ICredit
  creditNeedsToBeRecalculated: boolean
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
  orderError: null,
  inheritanceTaxError: null,
  newUser: null,
  newCompany: null,
  salesman: null,
  descriptionsWithAmount: [],
  remarks: [],
  giftIndexList: [],
  typeOfBuying: null,
  credit: null,
  creditNeedsToBeRecalculated: false,
}
