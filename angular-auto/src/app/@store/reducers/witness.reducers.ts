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
    case EWitnessActions.WitnessError: {
      return {
        ...state,
        witnesses: null,
        error: action.payload
      };
    }
    case EWitnessActions.StoreWitnessSuccess: {
      return {
        ...state,
        witnesses: [...state.witnesses, action.payload],
        error: null

      };
    }
    case EWitnessActions.DeleteWitnessSuccess: {
      return {
        ...state,
        witnesses: state.witnesses.filter(witness => witness.id !== action.payload),
        error: null

      };
    }
    default : {
      return state;
    }
  }
}
