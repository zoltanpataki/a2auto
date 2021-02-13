import {ICarState, initialCarState} from "../state/car.state";
import {CarActions, ECarActions} from "../actions/car.actions";

export const carReducers = (
  state = initialCarState,
  action: CarActions
): ICarState => {
  switch (action.type) {
    case ECarActions.GetCarsSuccess: {
      return {
        ...state,
        cars: action.payload,
        error: null
      };
    }
    case ECarActions.GetFilteredCarsSuccess: {
      return {
        ...state,
        cars: action.payload,
        error: null
      }
    }
    case ECarActions.GetFilteredCarsError: {
      return {
        ...state,
        cars: null,
        error: action.payload
      }
    }
    case ECarActions.GetCarsError: {
      return {
        ...state,
        cars: null,
        error: action.payload
      }
    }
    case ECarActions.UpdateCarError: {
      return {
        ...state,
        error: action.payload
      }
    }
    case ECarActions.StoreClickedCarIndex: {
      return {
        ...state,
        clickedCarIndex: action.payload
      }
    }
    case ECarActions.StorePickedCar: {
      return {
        ...state,
        pickedCar: action.payload
      }
    }
    default:
      return state;
  }
}
