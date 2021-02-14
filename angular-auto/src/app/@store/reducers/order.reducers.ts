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
    case EOrderActions.StoreIndividualOrCorporate: {
      return {
        ...state,
        individualOrCorporate: action.payload
      }
    }
    case EOrderActions.UpdateOrderProgress: {
      return {
        ...state,
        orderProgress: action.payload
      }
    }
    case EOrderActions.UpdateOrder: {
      return {
        ...state,
        order: action.payload
      }
    }
    case EOrderActions.StoreAlreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready: {
      return {
        ...state,
        alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready: action.payload
      }
    }
    case EOrderActions.StoreSelectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate: {
      return {
        ...state,
        selectedBetweenIndividualAndCompanyTrueIfIndividualFalseIfCorporate: action.payload
      }
    }
    default:
      return state;
  }
}

