import {initialWitnessState, IWitnessState} from "../state/witness.state";
import {EWitnessActions, WitnessActions} from "../actions/witness.actions";

export const witnessReducers = (
  state = initialWitnessState,
  action: WitnessActions
): IWitnessState => {
  switch (action.type) {
    case EWitnessActions.GetWitnessesSuccess: {
      return {
        ...state,
        witnesses: action.payload,
        error: null
      };
    }
    case EWitnessActions.GetWitnessesError: {
      return {
        ...state,
        witnesses: null,
        error: action.payload
      };
    }
    default : {
      return state;
    }
  }
}
