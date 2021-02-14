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