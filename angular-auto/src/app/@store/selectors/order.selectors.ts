import {IAppState} from "../state/app.state";
import {createSelector} from "@ngrx/store";
import {IOrderState} from "../state/order.state";

const selectOrder = (state: IAppState) => state.order;

export const selectPreviousOrNew = createSelector(
  selectOrder,
  (state: IOrderState) => state.previousOrNew
);
