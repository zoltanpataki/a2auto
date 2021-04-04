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
    case EOrderActions.StoreAskForInheritanceTaxCalculation: {
      return {
        ...state,
        askForInheritanceTaxCalculation: action.payload
      }
    }
    case EOrderActions.StoreAddCountInCar: {
      return {
        ...state,
        addCountInCar: action.payload
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
    case EOrderActions.StoreWantInheritanceTaxCalculation: {
      return {
        ...state,
        wantInheritanceTaxCalculation: action.payload
      }
    }
    case EOrderActions.StoreThereIsCountInCar: {
      return {
        ...state,
        thereIsCountInCar: action.payload
      }
    }
    case EOrderActions.StoreCountInCar: {
      return {
        ...state,
        countInCar: action.payload
      }
    }
    case EOrderActions.StoreCountInCarSupplement: {
      return {
        ...state,
        countInCarSupplement: action.payload
      }
    }
    case EOrderActions.GetInheritanceTaxSuccess: {
      return {
        ...state,
        inheritanceTax: action.payload
      }
    }
    case EOrderActions.GetInheritanceTaxError: {
      return {
        ...state,
        inheritanceTaxError: action.payload.errorMsg,
        wantInheritanceTaxCalculation: action.payload.wantInheritanceTaxCalculation,
        askForInheritanceTaxCalculation: action.payload.askForInheritanceTaxCalculation
      }
    }
    case EOrderActions.StoreDownPayment: {
      return {
        ...state,
        downPayment: action.payload
      }
    }
    case EOrderActions.StoreExtraPayment: {
      return {
        ...state,
        extraPayment: action.payload
      }
    }
    case EOrderActions.GetOrderSuccess: {
      return {
        ...state,
        order: action.payload
      }
    }
    case EOrderActions.GetOrderError: {
      return {
        ...state,
        orderError: action.payload
      }
    }
    default:
      return state;
  }
}

