import {IAppState} from "../state/app.state";
import {createSelector} from "@ngrx/store";
import {IOrderState} from "../state/order.state";

const selectOrder = (state: IAppState) => state.order;

export const selectPreviousOrNew = createSelector(
  selectOrder,
  (state: IOrderState) => state.previousOrNew
);

export const selectIndividualOrCorporate = createSelector(
  selectOrder,
  (state: IOrderState) => state.individualOrCorporate
);

export const selectAskForInheritanceTaxCalculation = createSelector(
  selectOrder,
  (state: IOrderState) => state.askForInheritanceTaxCalculation
);

export const selectAddCountInCar = createSelector(
  selectOrder,
  (state: IOrderState) => state.addCountInCar
);

export const selectInheritanceTax = createSelector(
  selectOrder,
  (state: IOrderState) => state.inheritanceTax
);

export const selectOrderError = createSelector(
  selectOrder,
  (state: IOrderState) => state.orderError
);

export const selectInheritanceTaxError = createSelector(
  selectOrder,
  (state: IOrderState) => state.inheritanceTaxError
);

export const selectOrderProgress = createSelector(
  selectOrder,
  (state: IOrderState) => state.orderProgress
);

export const selectActualOrder = createSelector(
  selectOrder,
  (state: IOrderState) => state.order
);

export const selectAlreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready = createSelector(
  selectOrder,
  (state: IOrderState) => state.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready
);

export const selectSelectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate = createSelector(
  selectOrder,
  (state: IOrderState) => state.selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate
);

export const selectWantInheritanceTaxCalculation = createSelector(
  selectOrder,
  (state: IOrderState) => state.wantInheritanceTaxCalculation
);

export const selectThereIsCountInCar = createSelector(
  selectOrder,
  (state: IOrderState) => state.thereIsCountInCar
);

export const selectCountInCar = createSelector(
  selectOrder,
  (state: IOrderState) => state.countInCar
);

export const selectCountInCarSupplement = createSelector(
  selectOrder,
  (state: IOrderState) => state.countInCarSupplement
);

export const selectDownPayment = createSelector(
  selectOrder,
  (state: IOrderState) => state.downPayment
);

export const selectExtraPayment = createSelector(
  selectOrder,
  (state: IOrderState) => state.extraPayment
);

export const selectNewUser = createSelector(
  selectOrder,
  (state: IOrderState) => state.newUser
);

export const selectNewCompany = createSelector(
  selectOrder,
  (state: IOrderState) => state.newCompany
);

export const selectSalesman = createSelector(
  selectOrder,
  (state: IOrderState) => state.salesman
);

export const selectDescriptionsWithAmount = createSelector(
  selectOrder,
  (state: IOrderState) => state.descriptionsWithAmount
);
