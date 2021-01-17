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
        cars: action.payload
      };
    }
    case ECarActions.GetFilteredCarsSuccess: {
      return {
        ...state,
        cars: action.payload
      }
    }
    default:
      return state;
  }
}
