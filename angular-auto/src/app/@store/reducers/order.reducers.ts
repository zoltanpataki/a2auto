import {initialOrderState, IOrderState} from "../state/order.state";
import {
  EOrderActions,
  OrderActions,
  StoreAlreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready
} from "../actions/order.actions";

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
      console.log('anyád')
      console.log(action.payload)
      console.log(state.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready)
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
    case EOrderActions.StoreNewUser: {
      return {
        ...state,
        newUser: action.payload
      }
    }
    case EOrderActions.StoreNewCompany: {
      return {
        ...state,
        newCompany: action.payload
      }
    }
    case EOrderActions.StoreSalesman: {
      return {
        ...state,
        salesman: action.payload
      }
    }
    case EOrderActions.GetOrderSuccess: {
      return {
        ...state,
        order: action.payload
      }
    }
    case EOrderActions.SaveOrderSuccess: {
      return {
        ...state,
        order: action.payload
      }
    }
    case EOrderActions.OrderError: {
      return {
        ...state,
        orderError: action.payload
      }
    }
    case EOrderActions.StoreDescriptionsWithAmount: {
      return {
        ...state,
        descriptionsWithAmount: action.payload
      }
    }
    case EOrderActions.StoreGiftIndexListSuccess: {
      return {
        ...state,
        giftIndexList: action.payload
      }
    }
    case EOrderActions.UpdateDescriptionWithAmount: {
      return {
        ...state,
        descriptionsWithAmount: [
          ...state.descriptionsWithAmount.slice(0, action.payload.index),
          {
            ...state.descriptionsWithAmount[action.payload.index],
            id: action.payload.descriptionWithAmount.id,
            description: action.payload.descriptionWithAmount.description,
            amount: action.payload.descriptionWithAmount.amount,
            charged: action.payload.descriptionWithAmount.charged
          },
          ...state.descriptionsWithAmount.slice(action.payload.index + 1)
        ]
      }
    }
    case EOrderActions.RemoveDescriptionWithAmount: {
      return {
        ...state,
        descriptionsWithAmount: [
          ...state.descriptionsWithAmount.slice(0, action.payload),
          ...state.descriptionsWithAmount.slice(action.payload + 1)
        ]
      }
    }
    case EOrderActions.StoreTypeOfBuying: {
      return {
        ...state,
        typeOfBuying: action.payload
      }
    }
    case EOrderActions.StoreCredit: {
      return {
        ...state,
        credit: action.payload
      }
    }
    case EOrderActions.StoreCreditNeedsToBeRecalculated: {
      return {
        ...state,
        creditNeedsToBeRecalculated: action.payload
      }
    }
    case EOrderActions.StoreRemarks: {
      return {
        ...state,
        remarks: action.payload
      }
    }
    default:
      return state;
  }
}

