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
    default:
      return state;
  }
}
