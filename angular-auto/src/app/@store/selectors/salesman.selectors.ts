import {IAppState} from "../state/app.state";
import {createSelector} from "@ngrx/store";
import {ISalesmanState} from "../state/salesman.state";

const selectSalesmen = (state: IAppState) => state.salesman;

export const selectSalesmenList = createSelector(
  selectSalesmen,
  (state: ISalesmanState) => state.salesmen
);

export const selectWitnessError = createSelector(
  selectSalesmen,
  (state: ISalesmanState) => state.error
);
