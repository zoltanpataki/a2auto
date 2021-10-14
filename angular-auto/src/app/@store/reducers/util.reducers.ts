import {initialUtilState, IUtilState} from "../state/util.state";
import {EUtilActions, UtilActions} from "../actions/util.actions";

export const utilReducers = (
  state = initialUtilState,
  action: UtilActions
): IUtilState => {
  switch (action.type) {
    case EUtilActions.StoreIsBlankPage: {
      return {
        ...state,
        isBlankPage: action.payload
      };
    }
    case EUtilActions.StoreIsTrophyClicked: {
      return {
        ...state,
        isTrophyClicked: action.payload
      };
    }
    default : {
      return state;
    }
  }
}
