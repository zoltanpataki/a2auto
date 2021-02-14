import {initialOrderState, IOrderState} from "../state/order.state";
import {EOrderActions, OrderActions} from "../actions/order.actions";

export const orderReducers = (
  state = initialOrderState,
  action: OrderActions
): IOrderState => {
  switch (action.type) {
    case EOrderActions.StorePreviousOrNew: {
      return {
        ...state,
        previousOrNew: action.payload
      }
    }
    default:
      return state;
  }
}

