import {Users} from "./users";
import {Company} from "./company";
import {CountInCarSupplement} from "./countInCarSupplement";
import {Credit} from "./credit";
import {Car} from "./car";

export class Order {
  id: number;
  alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready: boolean;
  selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate: boolean;
  wantInheritanceTaxCalculation: boolean;
  inheritanceTax: number;
  thereIsCountInCar: boolean;
  downPayment: number;
  selectedTypeOfBuying: string;
  users: Users;
  company: Company;
  countInCarSupplement: CountInCarSupplement;
  credit: Credit;
  countInCar: Car;


  constructor(id: number, alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready: boolean, selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate: boolean, wantInheritanceTaxCalculation: boolean, inheritanceTax: number, thereIsCountInCar: boolean, downPayment: number, selectedTypeOfBuying: string, users: Users, company: Company, countInCarSupplement: CountInCarSupplement, credit: Credit, countInCar: Car) {
    this.id = id;
    this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready = alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready;
    this.selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate = selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate;
    this.wantInheritanceTaxCalculation = wantInheritanceTaxCalculation;
    this.inheritanceTax = inheritanceTax;
    this.thereIsCountInCar = thereIsCountInCar;
    this.downPayment = downPayment;
    this.selectedTypeOfBuying = selectedTypeOfBuying;
    this.users = users;
    this.company = company;
    this.countInCarSupplement = countInCarSupplement;
    this.credit = credit;
    this.countInCar = countInCar;
  }
}
